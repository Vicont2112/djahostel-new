"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

export function HeroSection() {
  const { dict } = useLanguage();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Spotlight mouse position for the search bar
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!searchRef.current) return;
    const { left, top } = searchRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const spotlightBg = useSpring(
    useTransform(
      [mouseX, mouseY],
      ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
    ),
    { stiffness: 200, damping: 20 }
  );

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* Animated Mesh Blobs */}
      <div className="mesh-blob w-[600px] h-[600px] bg-accent-peach/5 top-[-100px] left-[-100px] animation-delay-2000" />
      <div className="mesh-blob w-[500px] h-[500px] bg-accent-indigo/10 bottom-[-100px] right-[-100px]" />
      <div className="mesh-blob w-[400px] h-[400px] bg-accent-blue/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-[10px] font-bold uppercase tracking-[0.5em] text-accent-peach"
        >
          24/7 • КИЇВ • УКРАЇНА
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.95] uppercase italic"
        >
          QUIET PLACE <br /> <span className="text-white/40 font-light not-italic">FOR REAL LIFE</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 font-light max-w-xl mb-16 tracking-tight"
        >
          {dict.hero.subtitle}. <br /> Втечи від шуму. Знайди свою творчу спільноту.
        </motion.p>

        {/* Floating Search Pill with Spotlight */}
        <motion.div 
          ref={searchRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl glass-pill px-8 py-5 flex items-center gap-6 shadow-2xl shadow-black group relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: spotlightBg }}
          />

          <Search className="w-5 h-5 text-white/40" />
          <div className="flex-grow flex items-center gap-3 text-left">
            <span className="text-white/20 text-[10px] font-black uppercase tracking-widest hidden sm:inline">LOCATION</span>
            <div className="flex items-center gap-2 text-white font-bold overflow-hidden whitespace-nowrap">
               <MapPin className="w-4 h-4 text-accent-peach" />
               Dja Hostel, Kyiv
            </div>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <button className="p-2 text-white/30 hover:text-white transition-colors relative z-10">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Key Features / Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {["8.9★ BOOKING.COM", "60% LONG-STAY", "22:00 SILENCE"].map((tag) => (
            <div key={tag} className="glass px-5 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-white hover:neon-border-blue transition-all cursor-default">
              {tag}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Retro Status Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 left-12 hidden md:flex items-center gap-4 glass px-6 py-3 rounded-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-accent-peach/20 flex items-center justify-center text-accent-peach font-bold">DJA</div>
        <div className="text-left">
           <div className="text-[11px] font-black text-white uppercase tracking-widest">The Quiet House</div>
           <div className="text-[9px] text-white/30 uppercase tracking-[0.3em]">EST. 2014</div>
        </div>
      </motion.div>
    </section>
  );
}

