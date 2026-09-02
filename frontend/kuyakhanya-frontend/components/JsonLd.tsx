type Props = { data: Record<string, unknown> };

export default function JsonLd({ data }: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function radioStationJsonLd() {
  const site = "https://kuyakhanyafm.web.app";
  return {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "@id": `${site}#radio`,
    name: "KUYAKHANYA FM",
    alternateName: "Kuyakhanya FM",
    description:
      "KUYAKHANYA FM — Online Christian radio from Thembalethu, George. We Shine Brighter Together. Live 24/7, shows, presenters, news & community.",
    url: site,
    slogan: "We Shine Brighter Together",
    inLanguage: "en-ZA",
    broadcastFrequency: { "@type": "BroadcastFrequencySpecification", broadcastFrequencyValue: "Online" },
    areaServed: { "@type": "City", name: "George", containedInPlace: { "@type": "AdministrativeArea", name: "Western Cape" } },
    address: { "@type": "PostalAddress", addressLocality: "Thembalethu", addressRegion: "Western Cape", addressCountry: "ZA" },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61580413033664",
      "https://www.instagram.com/kuyakhanyafm/",
      "https://www.youtube.com/@KuyakhanyaFM",
      "https://www.tiktok.com/@kuyakhanyafm",
    ],
    logo: `${site}/images/Kuyakhanya%20FM%20Icon.png`,
    image: `${site}/opengraph-image`,
    parentOrganization: {
      "@type": "Organization",
      name: "KUYAKHANYA FM",
      url: site,
      logo: `${site}/images/Kuyakhanya%20FM%20Icon.png`,
    },
    potentialAction: { "@type": "ListenAction", target: `${site}/#listen-live` },
  };
}
