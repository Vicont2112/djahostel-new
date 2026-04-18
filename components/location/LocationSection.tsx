"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { address, contacts } from "@/lib/site-content";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export function LocationSection() {
  const { dict, locale } = useLanguage();

  const MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${address.mapBbox.replace(/,/g, "%2C")}&layer=mapnik`;
  const MAP_EXTERNAL_HREF = `https://www.openstreetmap.org/?mlat=${address.mapLabelLat}&mlon=${address.mapLabelLon}#map=17/${address.mapLabelLat}/${address.mapLabelLon}`;

  const currentAddressLine = locale === "ua" ? address.lineUA : address.lineEN;
  const currentMetro = locale === "ua" ? address.metroUA : address.metroEN;

  const GOOGLE_MAPS_SEARCH =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${currentAddressLine}, Ukraine`);

  return (
    <section
      id="location"
      className="relative bg-background px-4 py-32 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent-blue mb-6 block"
            >
              FIND YOUR WAY
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10 uppercase italic">
              {dict.nav.location}
            </h2>
            
            <div className="space-y-8">
              <div className="p-8 glass rounded-[2rem] neon-border-blue/20">
                 <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-5 h-5 text-accent-blue mt-1" />
                    <div>
                      <div className="text-white text-lg font-bold tracking-tight">{currentAddressLine}</div>
                      <div className="text-white/40 text-sm mt-1">ОБОЛОНЬ, КИЇВ</div>
                    </div>
                 </div>
                 <p className="text-white/60 leading-relaxed font-light">
                   {locale === "ua" ? "Справжній осередок спокою в межах міста. Всього " : "A true haven of peace within city limits. Only "}
                   <span className="text-white font-bold">{address.walkMinutes} {locale === "ua" ? "хвилин" : "minutes"}</span>
                   {locale === "ua" ? " від метро " : " from "} <span className="text-white font-bold">{currentMetro}</span>.
                 </p>
              </div>

              <div className="flex flex-wrap gap-4">
                 <a
                    href={GOOGLE_MAPS_SEARCH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-between p-6 glass rounded-2xl hover:neon-border-blue transition-all group"
                 >
                    <div className="flex items-center gap-3">
                       <Navigation className="w-4 h-4 text-accent-blue" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Google Maps</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                 </a>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative glass rounded-[2.5rem] overflow-hidden p-4 neon-border-blue/10">
               <iframe
                title={`${locale === "ua" ? "Карта" : "Map"} — ${currentAddressLine}`}
                src={MAP_EMBED_SRC}
                className="aspect-square w-full border-0 rounded-[1.5rem] grayscale invert opacity-70 hover:opacity-90 transition-opacity duration-500"
                loading="lazy"
              />
              <div className="mt-6 text-center">
                 <a
                    href={MAP_EXTERNAL_HREF}
                    className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenStreetMap • SCHEMATIC VIEW
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

