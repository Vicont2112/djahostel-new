import { BookingForm } from "@/components/booking/BookingForm";
import { FloatingChat } from "@/components/chat/FloatingChat";
import { HeroSection } from "@/components/hero/HeroSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LocationSection } from "@/components/location/LocationSection";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { RoomsSection } from "@/components/rooms/RoomsSection";
import { TrustSection } from "@/components/trust/TrustSection";
import { VibeStrip } from "@/components/vibe/VibeStrip";

export default function Home() {
  return (
    <BookingProvider>
      <main className="min-h-dvh">
        <SiteHeader />
        <HeroSection />
        <VibeStrip />
        <TrustSection />
        <RoomsSection />
        <BookingForm />
        <LocationSection />
        <FloatingChat />
      </main>
    </BookingProvider>
  );
}
