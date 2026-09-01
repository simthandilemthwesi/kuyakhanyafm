"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const STREAM_URL = "https://cast3.asurahosting.com/proxy/kuyakhan/stream";
const FALLBACK_STREAM_URL = "https://cast3.asurahosting.com/proxy/kuyakhan/stream";

type ShowInfo = { title: string; presenter: string; day: string };

function getCurrentShow(): ShowInfo {
  const day = new Date().getDay(); // 0 Sun - 6 Sat
  const map: Record<number, ShowInfo> = {
    1: { day: "MONDAY", title: "Community Worship", presenter: "KUYAKHANYA FM Team" }, // Mon filler
    2: { day: "TUESDAY", title: "Love & Life", presenter: "Franky" },
    3: { day: "WEDNESDAY", title: "Abafazi Bokholo", presenter: "Mrs. Lolwana" },
    4: { day: "THURSDAY", title: "Ithemba Lokulila", presenter: "Mrs. Mati & Mrs. Panduva" },
    5: { day: "FRIDAY", title: "Friday Vibes", presenter: "Kay Cee" },
    6: { day: "SATURDAY", title: "Ezakwa Ntu", presenter: "DJ Toto" },
    0: { day: "SUNDAY", title: "Yizani Sakhe — Together We Revive", presenter: "Mrs. Mthwesi & Mrs. Ndziba" },
  };
  // Wednesday has two shows, alternate by hour: morning = Bokholo, afternoon = Nkwenkwezi
  if (day === 3) {
    const h = new Date().getHours();
    if (h >= 12) return { day: "WEDNESDAY", title: "Inkwenkwezi Zethu", presenter: "Mrs. Klass" };
  }
  return map[day] ?? map[1];
}

type AudioContextType = {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  error: string | null;
  currentShow: ShowInfo;
  nowPlaying: string;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVol] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nowPlaying, setNowPlaying] = useState<string>("Live Broadcast • Streaming 24/7");
  const [currentShow, setCurrentShow] = useState<ShowInfo>(getCurrentShow());

  // Load volume from localStorage
  useEffect(() => {
    const v = localStorage.getItem("kuyakhanya-volume");
    if (v) {
      const n = parseFloat(v);
      if (!Number.isNaN(n)) setVol(Math.min(1, Math.max(0, n)));
    }
    const m = localStorage.getItem("kuyakhanya-muted");
    if (m === "true") setIsMuted(true);
    // update show every minute
    const id = setInterval(() => setCurrentShow(getCurrentShow()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem("kuyakhanya-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("kuyakhanya-muted", String(isMuted));
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  // Try fetching now-playing metadata (best-effort, no error if fails)
  useEffect(() => {
    let cancelled = false;
    const fetchNowPlaying = async () => {
      try {
        // AsuraHosting status json — try several endpoints, CORS may block so silent catch
        const urls = [
          "https://cast3.asurahosting.com/api/nowplaying/kuyakhan",
          "https://cast3.asurahosting.com/api/nowplaying/1",
        ];
        for (const url of urls) {
          try {
            const r = await fetch(url, { cache: "no-store" });
            if (!r.ok) continue;
            const j = await r.json();
            const title = j?.now_playing?.song?.title || j?.song?.title || j?.title;
            if (title && !cancelled) {
              setNowPlaying(title);
              break;
            }
          } catch {}
        }
      } catch {}
    };
    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, 20000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    setError(null);
    setIsLoading(true);
    try {
      // Ensure src set
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        audioRef.current.src = STREAM_URL;
      }
      audioRef.current.volume = isMuted ? 0 : volume;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Playback failed";
      // Autoplay policy: user gesture required — show friendly message
      if (msg.includes("NotAllowedError") || msg.includes("play")) {
        setError("Tap play again to start streaming");
      } else {
        setError(msg);
      }
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isMuted, volume]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVol(clamped);
    if (clamped > 0 && isMuted) setIsMuted(false);
  }, [isMuted]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  // Media Session API + keyboard shortcuts — premium easy features
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentShow.title,
        artist: currentShow.presenter,
        album: "KUYAKHANYA FM — We Shine Brighter Together",
        artwork: [{ src: "/images/Kuyakhanya FM Icon.png", sizes: "512x512", type: "image/png" }],
      });
      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("pause", pause);
    }
  }, [currentShow, play, pause]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setVolume(Math.min(1, volume + 0.05));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setVolume(Math.max(0, volume - 0.05));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, toggleMute, setVolume, volume]);

  // Auto-reconnect on error / stall
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onError = () => {
      setError("Stream interrupted — reconnecting…");
      setIsPlaying(false);
      setIsLoading(false);
      // try reconnect after 2s if was playing
      setTimeout(() => {
        if (isPlaying) play();
      }, 2000);
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setError(null);
    };
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    a.addEventListener("error", onError);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("playing", onPlaying);
    a.addEventListener("pause", onPause);
    a.addEventListener("play", onPlay);
    return () => {
      a.removeEventListener("error", onError);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("playing", onPlaying);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("play", onPlay);
    };
  }, [play, isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, isLoading, volume, isMuted, error, currentShow, nowPlaying, togglePlay, play, pause, setVolume, toggleMute, audioRef }}>
      {/* Hidden native audio — premium playback engine */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        crossOrigin="anonymous"
        playsInline
        aria-label="KUYAKHANYA FM Live Stream"
      />
      {children}
    </AudioContext.Provider>
  );
}
