'use client';

import { motion } from "framer-motion";
import { HolographicRoomCard } from "./HolographicRoomCard";

const roomTypes = [
  {
    title: "The Peach Nest",
    price: "450",
    type: "Dorm Room",
    tags: ["Female Only", "Garden View", "Quiet Zone"],
    image: ""
  },
  {
    title: "Midnight Indigo",
    price: "400",
    type: "Mixed Dorm",
    tags: ["8-Beds", "Privacy Curtains", "AC"],
    image: ""
  },
  {
    title: "Azure Studio",
    price: "1200",
    type: "Private",
    tags: ["Ensuite", "Workspace", "Balcony"],
    image: ""
  }
];

export function RoomsSection() {
  return (
    <section className="relative py-32 px-4 bg-background overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 flex flex-col items-center text-center">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-blue mb-6"
            >
              CHOOSE YOUR VIBE
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
              Living <span className="text-white/20 not-italic font-light">Spaces</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {roomTypes.map((room, index) => (
             <motion.div
               key={room.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
             >
               <HolographicRoomCard {...room} image="" />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
