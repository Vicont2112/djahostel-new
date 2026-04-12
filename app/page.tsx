import { BookingForm } from "@/components/booking/BookingForm";
import { ForWhomSection } from "@/components/forwhom/ForWhomSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LocationSection } from "@/components/location/LocationSection";
import { ManifestoSection } from "@/components/manifesto/ManifestoSection";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { RoomsSection } from "@/components/rooms/RoomsSection";
import { StayStorySection } from "@/components/story/StayStorySection";
import { TrustSection } from "@/components/trust/TrustSection";
import { VideoTourSection } from "@/components/video/VideoTourSection";
import { VibeStrip } from "@/components/vibe/VibeStrip";

import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <BookingProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <SiteHeader />
          <HeroSection />
          <StayStorySection />
          <VibeStrip />
          <ForWhomSection />
          <ManifestoSection />
          <VideoTourSection />
          <TrustSection />
          <RoomsSection />
          <BookingForm />
          <LocationSection />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}
