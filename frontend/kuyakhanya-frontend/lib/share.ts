export const SITE_URL = "https://kuyakhanyafm.web.app";

export type ShareNetwork =
  | "facebook"
  | "x"
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "youtube";

function buildShareUrl(
  network: ShareNetwork,
  opts: { url?: string; title?: string; description?: string; image?: string }
): string {
  const url = opts.url || SITE_URL;
  const title = opts.title || "KUYAKHANYA FM";
  const description = opts.description || "WE SHINE BRIGHTER TOGETHER";
  const image = opts.image || "";
  switch (network) {
    case "facebook":
      return (
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(url)
      );
    case "x":
      return (
        "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(title + " — " + description)
      );
    case "linkedin":
      return (
        "https://www.linkedin.com/sharing/share-offsite/?url=" +
        encodeURIComponent(url)
      );
    case "whatsapp":
      return (
        "https://wa.me/?text=" +
        encodeURIComponent(title + " — " + description + " " + url)
      );
    case "instagram":
      // Instagram has no open share URL — open the profile with a prefilled caption hint.
      return "https://www.instagram.com/kuyakhanyafm/";
    case "youtube":
      return "https://www.youtube.com/@KuyakhanyaFM";
    default:
      return url;
  }
}

// Metadata consumed for OG/description on each share network link.
export function shareTarget(
  network: ShareNetwork,
  opts?: { url?: string; title?: string; description?: string; image?: string }
) {
  return {
    url: buildShareUrl(network, opts || {}),
    title: opts?.title || "KUYAKHANYA FM",
    description: opts?.description || "WE SHINE BRIGHTER TOGETHER",
    ogImage: opts?.image || "",
  };
}

export const SHARE_NETWORKS: { id: ShareNetwork; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "x", label: "X" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "whatsapp", label: "WhatsApp" },
];
