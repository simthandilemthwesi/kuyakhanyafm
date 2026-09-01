"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: unknown;
  }
}

export default function Chatbot() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CHATBOT_ID;
    if (!id) return;

    const inject = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = id;
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    };

    if (!window.chatbase) {
      (window as { chatbase?: unknown }).chatbase = ((
        ...args: unknown[]
      ) => {
        const w = window as unknown as { chatbase: { q?: unknown[][]; (...a: unknown[]): void } };
        if (!w.chatbase.q) w.chatbase.q = [];
        w.chatbase.q.push(args);
      }) as unknown;
    }

    if (document.readyState === "complete") {
      inject();
    } else {
      const onLoad = () => inject();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return null;
}
