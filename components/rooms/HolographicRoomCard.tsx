'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Share2, Star, Users } from 'lucide-react';

interface RoomCardProps {
  title: string;
  price: string;
  type: string;
  image: string;
  tags: string[];
}

export const HolographicRoomCard = ({ title, price, type, tags }: RoomCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Mouse positioning for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor followers
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
    
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative w-full h-[400px] glass rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:neon-border-blue"
    >
      {/* Dynamic Glow Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(600px circle at ${gx}px ${gy}px, rgba(59, 130, 246, 0.1), transparent 40%)`
          ),
        }}
      />

      {/* Holographic Sheen (Shimmer) */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br from-transparent via-accent-indigo/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
             <span className="text-[10px] font-bold tracking-[.3em] text-accent-blue uppercase">{type}</span>
             <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{title}</h3>
          </div>
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
             <Share2 className="w-4 h-4 text-white/40" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
           {tags.map(tag => (
             <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-white/50 uppercase tracking-widest">{tag}</span>
           ))}
        </div>
      </div>

      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-end justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Pricing starting at</span>
              <div className="text-3xl font-black text-white">
                {price} <span className="text-[10px] text-white/30 uppercase ml-1">UAH / Night</span>
              </div>
           </div>
           <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-black" />
           </button>
        </div>
      </div>

      {/* Decoration: Subtle Circle */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-blue/5 blur-[80px] rounded-full -z-10" />
    </motion.div>
  );
};
