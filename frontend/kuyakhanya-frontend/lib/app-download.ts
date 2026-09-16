export function detectPlatform(): { kind: "ios" | "android" | "other"; device: string } {
  if (typeof navigator === "undefined") return { kind: "other", device: "unknown" };
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return { kind: "ios", device: "iPhone/iPad" };
  if (/android/i.test(ua)) return { kind: "android", device: "Android" };
  if (/windows/i.test(ua)) return { kind: "other", device: "Windows" };
  if (/mac os x/i.test(ua)) return { kind: "other", device: "macOS" };
  if (/linux/i.test(ua)) return { kind: "other", device: "Linux" };
  return { kind: "other", device: "Desktop" };
}