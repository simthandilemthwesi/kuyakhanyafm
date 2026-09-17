/**
 * Shared show data — server-safe module (no "use client").
 * Imported by both ShowsPresentersClient and ShowsSection so the
 * home grid and the /shows-presenters page always agree.
 */
export type Show = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  title: string;
  time: string;
  host: string;
  image: string;
  theme: string;
  description: string;
  accent: string;
};

export const SHOWS: Show[] = [
  {
    day: "Monday",
    title: "Youth Spotlight",
    time: "07:00 pm – 08:00 pm",
    host: "Sbu Hamza",
    image: "/images/show 1.png",
    theme: "Youth • Growth • Spotlight",
    description: "Every Monday, 19:00–20:00 — a platform that puts the youth in the spotlight, featuring young voices, talent and real conversations.",
    accent: "#FFD700",
  },
  {
    day: "Tuesday",
    title: "Love & Life",
    time: "06:00 pm – 07:00 pm",
    host: "Franky",
    image: "/images/show 2.png",
    theme: "Love • Life • Relationships",
    description: "Warm conversation around love, life and relationships — real stories and heartfelt advice.",
    accent: "#e91e8c",
  },
  {
    day: "Wednesday",
    title: "Abafazi Bokholo",
    time: "05:00 pm – 06:00 pm",
    host: "Mrs Lolwana",
    image: "/images/show 3.png",
    theme: "Wisdom • Strength • Purpose",
    description: "Celebrating women of faith, resilience, wisdom and purpose — powerful testimonies and honest dialogue.",
    accent: "#8a2be2",
  },
  {
    day: "Wednesday",
    title: "Inkwenkwezi Zethu",
    time: "06:00 pm – 07:00 pm",
    host: "Mrs Klaas",
    image: "/images/show 4.png",
    theme: "Inspiration • Empowerment • Faith",
    description: "Inspiration that connects — stories of empowerment, faith and hope that uplift our community.",
    accent: "#FFD700",
  },
  {
    day: "Thursday",
    title: "Ithemba Lokulila",
    time: "06:00 pm – 08:00 pm",
    host: "Mrs Mati & Mrs Panduva",
    image: "/images/show 5.png",
    theme: "Faith • Hope • Encouragement",
    description: "Faith, hope and encouragement for the journey — a space where community finds healing and prayer.",
    accent: "#4B0082",
  },
  {
    day: "Friday",
    title: "Friday Vibes",
    time: "06:00 pm – 07:00 pm",
    host: "Kay Cee",
    image: "/images/show 6.png",
    theme: "Music • Energy • Weekend Vibes",
    description: "Feel the weekend energy! Music, conversation and vibrant vibes — louder, brighter, made to move you.",
    accent: "#ff2e8a",
  },
  {
    day: "Saturday",
    title: "Ezakwa Ntu",
    time: "01:00 pm – 03:00 pm",
    host: "DJ Toto",
    image: "/images/show 7.png",
    theme: "Culture • Heritage • Roots",
    description: "A proudly African celebration of culture, heritage and roots — music, language and stories.",
    accent: "#FFD700",
  },
  {
    day: "Sunday",
    title: "Yizani Sakhe",
    time: "06:00 pm – 08:00 pm",
    host: "Mrs Mthwesi & Mrs Ndziba",
    image: "/images/show 8.png",
    theme: "Faith • Restoration • Revival",
    description: "An inspirational Sunday gathering of faith, restoration and revival — to be restored and sent out to shine.",
    accent: "#a66cff",
  },
];
