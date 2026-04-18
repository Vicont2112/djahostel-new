'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useBooking } from '@/components/providers/BookingProvider';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { AvailabilityRoom } from '@/lib/sheets-client';

const roomStyles: Record<string, { color: string; glow: string }> = {
  'female-4a': { color: 'border-accent-peach/30 bg-accent-peach/5', glow: 'shadow-[0_0_30px_rgba(251,146,60,0.1)]' },
  'mixed-8': { color: 'border-accent-blue/30 bg-accent-blue/5', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.1)]' },
  'male-8': { color: 'border-accent-indigo/30 bg-accent-indigo/5', glow: 'shadow-[0_0_30px_rgba(99,102,241,0.1)]' },
  'female-4b': { color: 'border-accent-blue/20 bg-accent-blue/5', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.05)]' },
};

export const FloorPlan = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { availability, availabilityLoading } = useBooking();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayRooms = (availability?.rooms as AvailabilityRoom[]) || [];

  return (
    <section className="relative w-full py-32 px-4 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white uppercase italic"
          >
            БУДИНОК ЯК НА ДОЛОНІ
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-xl mx-auto text-[10px] font-bold uppercase tracking-[0.5em]"
          >
            ІНТЕРАКТИВНА ГОЛОГРАМА • {availabilityLoading ? 'L O A D I N G' : '24 МІСЦЯ • REAL-TIME DATA'}
          </motion.p>
        </div>

        {/* Isometric Stage */}
        <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
           {/* Shadow/Glow Base */}
           <div className="absolute w-[800px] h-[400px] bg-accent-indigo/5 blur-[100px] rounded-full rotate-[-35deg] translate-y-20" />

           {/* Floating Particles/Dust */}
           <div className="absolute inset-0 z-0 pointer-events-none">
              {isMounted && Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: Math.random() * 1000 - 500, y: Math.random() * 600 - 300, opacity: 0 }}
                  animate={{ y: [null, Math.random() * -100 - 50], opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
                  transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px]"
                />
              ))}
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="isometric-view w-full h-full flex items-center justify-center relative"
           >
              <div className="scanline z-50 pointer-events-none" />

              <div className="grid grid-cols-2 grid-rows-2 gap-8 w-full h-full p-12 relative z-10">
                <AnimatePresence mode="popLayout">
                  {displayRooms.map((room) => {
                    const style = roomStyles[room.id] || roomStyles['female-4b'];
                    return (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ translateZ: 40 }}
                        className={cn(
                          "relative rounded-2xl border flex flex-col p-8 transition-all duration-700 overflow-hidden",
                          style.color,
                          style.glow,
                          availabilityLoading && "opacity-50 grayscale"
                        )}
                        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                      >
                        <div className="scanline opacity-20 pointer-events-none" />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <h3 className="text-[10px] font-black tracking-[.3em] text-white/90 uppercase">
                            {room.name}
                          </h3>
                          <div className={cn(
                            "w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]",
                            (room.availableBeds ?? 0) > 0 ? "text-accent-peach" : "text-white/20"
                          )} />
                        </div>

                        <div className="grid grid-cols-4 gap-4 relative z-10">
                          {room.beds?.map((bed) => (
                            <motion.div
                              key={bed.bedId}
                              whileHover={{ scale: 1.1, translateZ: 10 }}
                              className={cn(
                                "aspect-[1.5/1] rounded-md border transition-all duration-300 shimmer",
                                bed.isAvailable 
                                  ? "bg-white/10 border-white/20" 
                                  : "bg-white/5 border-white/5 opacity-10"
                              )}
                              style={{ transform: 'translateZ(10px)' }}
                            >
                              <div className="w-full h-full flex items-center justify-center">
                                 <span className="text-[9px] font-black text-white/20 uppercase">
                                   {bed.bedName}
                                 </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-10 text-[9px] font-black text-white/20 uppercase tracking-[.4em] relative z-10">
                           {room.totalBeds ?? 0} BEDS • {room.availableBeds ?? 0} FREE
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
           </motion.div>

           {/* Status Info (Floating Overlay) */}
           <div className="absolute bottom-0 right-0 glass px-8 py-5 rounded-3xl border-white/10 text-left hidden lg:block shadow-2xl">
              <div className="text-[10px] font-black text-white/40 mb-3 uppercase tracking-[.3em]">Live Overview</div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-accent-peach shadow-[0_0_10px_var(--accent-peach)]" />
                 <span className="text-[10px] font-bold text-white/60 tracking-widest">AVAILABLE</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                 <span className="text-[10px] font-bold text-white/20 tracking-widest">OCCUPIED</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
