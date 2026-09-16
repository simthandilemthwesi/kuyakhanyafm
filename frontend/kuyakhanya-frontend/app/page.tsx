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
import { fetchVisionMission, fetchAimsObjectives } from "@/lib/api";

// Home — massive premium 3D broadcast experience
export default async function HomePage() {
  const [vm, ao] = await Promise.all([
    fetchVisionMission().catch(() => null),
    fetchAimsObjectives().catch(() => null),
  ]);

  return (
    <>
      <Hero />
      <WeatherUpdates />
      <AboutSection />
      <ShowsSection />
      <PresentersSection />
      <TeamSection />
      <VisionMission vision={vm?.vision} missionItems={vm?.missionItems} />
      <AimsObjectives objectives={ao?.objectives} />
      <ListenLive />
      <NewsSection />
      <EventsSection />
      </>
  );
}
