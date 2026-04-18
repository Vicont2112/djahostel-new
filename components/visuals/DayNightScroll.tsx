'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const DayNightScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background color from deep zinc to midnight indigo
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["#09090b", "#18181b", "#020617", "#000000"]
  );

  // Text brightness/opacity transition
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["#94a3b8", "#f1f5f9", "#cbd5e1", "#64748b"]
  );

  const sunOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [0.6, 0.3, 0]);
  const moonOpacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 0.4, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-[150vh] w-full flex flex-col items-center py-40 overflow-hidden"
    >
      <motion.div style={{ color: textColor }} className="z-10 text-center px-4 max-w-4xl sticky top-1/4">
        <motion.span 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.5em] font-bold mb-10 block text-accent-peach"
        >
          SILENCE AS A SERVICE
        </motion.span>
        
        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-16 text-white transition-all duration-700">
          Ми не кажемо про тишу.<br/>
          <span className="font-light italic opacity-80">Ми її створюємо.</span>
        </h2>
        
        <div className="space-y-10 text-lg md:text-xl font-light opacity-60 leading-relaxed max-w-2xl mx-auto">
          <p>
            Після 22:00 дім занурюється у спокій. Це не правило, це — культура поваги до чужого сну та своєї продуктивності.
          </p>
          <p>
            Світло приглушується, голоси стихають. Ви бачите, як змінюється простір, коли настає час для відновлення.
          </p>
        </div>
      </motion.div>

      {/* Decorative Glows */}
      <motion.div
        style={{ opacity: sunOpacity }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent-peach/5 blur-[150px] rounded-full"
      />
      <motion.div
        style={{ opacity: moonOpacity }}
        className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-accent-blue/10 blur-[150px] rounded-full"
      />
    </motion.section>
  );
};

