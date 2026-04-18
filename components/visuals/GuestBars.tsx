'use client';

import React from 'react';
import { motion } from 'framer-motion';

const guests = [
  { name: 'Victor', nights: 365, role: 'Host', isHost: true },
  { name: 'Anna', nights: 124, role: 'Remote Work' },
  { name: 'Marcus', nights: 89, role: 'Digital Nomad' },
  { name: 'Svitlana', nights: 62, role: 'Relocation' },
  { name: 'Jean', nights: 45, role: 'Deep Work' },
  { name: 'Olena', nights: 14, role: 'Travel' },
  { name: 'Chris', nights: 3, role: 'Short trip' },
];

export const GuestBars = () => {
  const maxNights = 180; // Caps for visual purposes

  return (
    <section className="w-full py-32 bg-background text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <div className="flex-1">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent-indigo mb-6 block"
            >
              COMMUNITY DATA
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">МИ НЕ ВІРИМО У СТАТИСТИКУ.</h2>
            <p className="text-lg text-white/50 font-light leading-relaxed">
              Замість &quot;60% залишаються надовго&quot;, ми показуємо реальні терміни. 
              Dja — це дім, де люди живуть місяцями, знаходять друзів та створюють проекти.
            </p>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-6">
            <div className="p-8 glass rounded-3xl neon-border-peach">
              <div className="text-4xl font-bold text-accent-peach">44+</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-4 font-bold">AVG. STAY (DAYS)</div>
            </div>
            <div className="p-8 glass rounded-3xl neon-border-blue">
              <div className="text-4xl font-bold text-accent-blue">92%</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-4 font-bold">RECURRING GUESTS</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {guests.map((guest, i) => (
            <div key={guest.name} className="group flex items-center gap-6">
              <div className="w-24 text-[11px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                {guest.name}
              </div>
              <div className="flex-grow h-12 glass rounded-full relative overflow-hidden flex items-center">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((guest.nights / maxNights) * 100, 100)}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className={cn(
                    "h-full rounded-full flex items-center justify-end px-6 text-[10px] font-bold tracking-widest transition-all duration-500",
                    guest.isHost ? "bg-gradient-to-r from-accent-peach to-accent-indigo text-white shadow-lg shadow-accent-peach/20" : "bg-white/5 group-hover:bg-accent-blue/10 text-white/40 group-hover:text-white"
                  )}
                >
                  {guest.nights} {guest.nights === 1 ? 'NIGHT' : 'NIGHTS'}
                </motion.div>
                <div className="absolute left-6 text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 group-hover:text-white/40 transition-colors">
                  {guest.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}


