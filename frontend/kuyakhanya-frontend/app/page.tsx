import Hero from "@/components/Hero";
import WeatherUpdates from "@/components/WeatherUpdates";
import AboutSection from "@/components/AboutSection";
import ShowsSection from "@/components/ShowsSection";
import PresentersSection from "@/components/PresentersSection";
import TeamSection from "@/components/TeamSection";
import VisionMission from "@/components/VisionMission";
import AimsObjectives from "@/components/AimsObjectives";
import ListenLive from "@/components/ListenLive";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import BannerAd from "@/components/BannerAd";
import { siteData } from "@/lib/site-data";

// Home — massive premium 3D broadcast experience
export default function HomePage() {
  const vm = { vision: siteData.vision, missionItems: siteData.mission };
  const ao = { objectives: siteData.aims };

  return (
    <>
      <Hero />
      <WeatherUpdates />
      <BannerAd />
      <AboutSection />
      <ShowsSection />
      <BannerAd />
      <PresentersSection />
      <TeamSection />
      <BannerAd />
      <VisionMission vision={vm?.vision} missionItems={vm?.missionItems} />
      <AimsObjectives objectives={ao?.objectives} />
      <BannerAd />
      <ListenLive />
      <NewsSection />
      <EventsSection />
      <BannerAd />
      </>
  );
}
