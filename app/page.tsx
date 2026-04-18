import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/hero/HeroSection";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { FloorPlan } from "@/components/visuals/FloorPlan";
import { RoomsSection } from "@/components/rooms/RoomsSection";
import { DayNightScroll } from "@/components/visuals/DayNightScroll";
import { GuestBars } from "@/components/visuals/GuestBars";
import { MetroMap } from "@/components/visuals/MetroMap";
import { VideoTourSection } from "@/components/video/VideoTourSection";

import { TrustSection } from "@/components/trust/TrustSection";
import { LocationSection } from "@/components/location/LocationSection";


export default function Home() {
  return (
    <BookingProvider>
      <div className="flex flex-col min-h-screen selection:bg-orange-500/30">
        <main className="flex-grow">
          <SiteHeader />
          <HeroSection />
          
          {/* Pillar 1: Showing the Building */}
          <FloorPlan />

          {/* New Enhancement: Premium Room Selection */}
          <RoomsSection />
          
          {/* Pillar 2: Showing the Atmosphere */}
          <DayNightScroll />
          
          <VideoTourSection />
          
          {/* Pillar 3: Showing the Community */}
          <GuestBars />
          
          <MetroMap />
          
          {/* Feedback & Logistics */}
          <TrustSection />
          <LocationSection />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}

