'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MetroMap = () => {
  return (
    <section className="w-full py-32 bg-background text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
           <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent-blue mb-6 block"
            >
              LOCATION & CONTEXT
            </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">12 ХВИЛИН ВІД МЕТРО.</h2>
          <p className="text-lg text-white/50 font-light leading-relaxed mb-12">
            Вихід з метро &quot;Героїв Дніпра&quot;, пряма алея вздовж Оболоні, і ви вдома. 
            Ми знаходимося в тихому приватному секторі — ідеальний баланс між містом та спокоєм.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent-blue shrink-0 group-hover:neon-border-blue transition-all">
                M
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase">Героїв Дніпра</h4>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Синя гілка метро (12 хв пішки)</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent-peach shrink-0 group-hover:neon-border-peach transition-all">
                ☕
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase">Кава та випічка</h4>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">3 хвилини до найближчого кафе</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white shrink-0 group-hover:neon-border-blue transition-all">
                🌊
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-widest uppercase">Озеро Міністерка</h4>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">10 хвилин до природи</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square glass rounded-[2.5rem] overflow-hidden p-8 neon-border-blue/20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* The stylized road grid */}
            {[50, 150, 250, 350].map(x => (
              <path key={`v-${x}`} d={`M${x},0 L${x},400`} className="stroke-white/5 stroke-[1]" />
            ))}
            {[80, 180, 280].map(y => (
              <path key={`h-${y}`} d={`M0,${y} L400,${y}`} className="stroke-white/5 stroke-[1]" />
            ))}

            {/* Path from Metro */}
            <motion.path
              d="M100,50 L100,250 L300,250 L300,320"
              fill="transparent"
              strokeWidth="4"
              stroke="var(--accent-peach)"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]"
            />

            {/* Metro point */}
            <circle cx="100" cy="50" r="8" fill="var(--accent-blue)" className="shadow-lg shadow-blue-500/50" />
            <text x="115" y="55" className="fill-blue-400 text-[9px] font-black uppercase tracking-widest">M HEROIV DNIPRA</text>

            {/* Dja point */}
            <motion.circle 
              cx="300" cy="320" r="10" fill="var(--accent-peach)"
              initial={{ scale: 0 }}
              whileInView={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 2 }}
            />
            <text x="315" y="325" className="fill-white text-[11px] font-black uppercase tracking-widest">DJA HOSTEL</text>

            {/* Landmarks */}
            <circle cx="100" cy="180" r="4" fill="white" opacity="0.2" />
            <text x="110" y="180" className="fill-white/30 text-[8px] font-bold uppercase tracking-tighter">COFFEE</text>

            <circle cx="350" cy="150" r="4" fill="#3b82f6" opacity="0.3" />
            <text x="325" y="145" className="fill-blue-400/50 text-[8px] font-bold uppercase tracking-tighter">LAKE</text>
          </svg>
          
          <div className="absolute top-8 right-8 text-[9px] text-white/20 font-bold uppercase tracking-[0.3em]">
            SCHEMATIC MAP • N 50.448
          </div>
        </div>
      </div>
    </section>
  );
};

