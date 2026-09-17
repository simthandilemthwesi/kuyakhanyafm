/**
 * People data — presenters + management with URL slugs.
 * Presenter bios are the official taglines; management bios come
 * straight from site-data. Nothing invented.
 */
import { siteData } from "./site-data";

export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  kind: "presenter" | "manager";
  show?: string;
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PRESENTER_BIOS: Record<string, string> = {
  "Sbu Hamza":
    "A dynamic youth leader amplifying voices of growth, unity, and empowerment on Youth Spotlight.",
  Franky:
    "A passionate host exploring the intersection of love and life with purpose and authenticity.",
  "Mrs Klaas":
    "A community voice inspiring faith, empowerment, and resilience through Inkwenkwezi Zethu.",
  "Mrs Mati":
    "A guiding presence bringing hope, healing, and restoration on Ithemba Lokulila.",
  "Mrs Lolwana":
    "A faith-driven leader championing wisdom, strength, and purpose on Abafazi Bokholo.",
  "Kay Cee":
    "A vibrant host delivering good music and good vibes every Friday on Friday Vibes.",
  "DJ Toto":
    "A cultural curator celebrating our people, our music, and our heritage on Ezakwa Ntu.",
  "Mrs Ndziba":
    "A co-host dedicated to reviving communities with faith and togetherness on Yizani Sakhe.",
};

const FALLBACK_PHOTO = "/images/Kuyakhanya FM Icon.png";

export const presenters: Person[] = siteData.presenters.map((p) => ({
  slug: slugify(p.name),
  name: p.name,
  role: p.role,
  bio: PRESENTER_BIOS[p.name] ?? `Host of ${p.role} on KUYAKHANYA FM.`,
  photo: p.photo || FALLBACK_PHOTO,
  kind: "presenter",
  show: p.role,
}));

export const managers: Person[] = [
  siteData.managingDirector,
  ...siteData.managementTeam,
  siteData.technician,
].map((m) => ({
  slug: slugify(m.name),
  name: m.name,
  role: m.role,
  bio: m.bio || `${m.role} at KUYAKHANYA FM.`,
  photo: m.photo || FALLBACK_PHOTO,
  kind: "manager" as const,
}));
