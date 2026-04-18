"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { contacts } from "@/lib/site-content";
import { motion } from "framer-motion";
import { Quote, Star, MessageSquare, ExternalLink } from "lucide-react";

export function TrustSection() {
  const { dict, locale } = useLanguage();

  return (
    <div className="bg-background">
      {/* Reviews Section */}
      <section
        id="trust"
        className="relative px-4 py-32 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] text-accent-blue"
             >
                <Star className="w-3 h-3 fill-accent-blue" />
                BOOKING.COM: {dict.trustFacts.bookingRating} / 10
             </motion.div>
             <h2 className="text-3xl md:text-5xl font-bold text-white mt-8 tracking-tight">
                {locale === "ua" ? "ЩО КАЖУТЬ ГОСТІ" : "WHAT GUESTS SAY"}
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.trustQuotes.map((q, i) => (
              <motion.div 
                key={q.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2rem] relative group hover:neon-border-blue transition-all"
              >
                <Quote className="w-8 h-8 text-white/5 absolute top-6 right-8" />
                <blockquote className="text-lg leading-relaxed text-white/80 font-light mb-8">
                  «{q.text}»
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue uppercase font-bold text-xs ring-1 ring-accent-blue/30">
                     {q.attribution[0]}
                  </div>
                  <div className="text-xs font-bold tracking-widest text-white/40 uppercase">
                    {q.attribution}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {contacts.googleMapsUrl && (
            <div className="mt-16 text-center">
              <a
                href={contacts.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-accent-blue transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                {dict.trust.googleReviewsLink}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Honest block + Price */}
      <section className="px-4 py-32 border-t border-white/5 bg-zinc-950/50">
        <div className="mx-auto grid max-w-5xl gap-20 lg:grid-cols-2 items-start">
          {/* Honest */}
          <div className="p-10 glass rounded-[2.5rem] neon-border-peach/20">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-8">
              {dict.honestBlock.title}
            </h2>
            <div className="space-y-6 text-white/50 font-light leading-relaxed">
               {dict.honestBlock.body.split('\n').map((para, i) => (
                 <p key={i}>{para}</p>
               ))}
            </div>
          </div>

          {/* Price */}
          <div className="p-10 glass rounded-[2.5rem] neon-border-blue/20">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-8">
              {dict.trust.pricesTitle}
            </h2>
            <div className="space-y-1">
                {dict.priceTiers.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-4 border-b border-white/5 last:border-0"
                  >
                    <div className="flex flex-col gap-1">
                       <span className="text-xs font-bold tracking-widest text-white/80 uppercase">{row.label}</span>
                       {"savings" in row && row.savings && (
                        <span className="w-fit rounded-full bg-accent-peach/10 px-2 py-0.5 text-[8px] font-black text-accent-peach uppercase tracking-tighter">
                          {row.savings}
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold text-accent-blue">
                      {row.price} <span className="text-[10px] text-white/30 uppercase ml-1">{locale === "ua" ? "грн" : "UAH"}</span>
                    </div>
                  </div>
                ))}
            </div>
            <p className="mt-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              * {dict.trust.priceNote}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-40 bg-mesh relative overflow-hidden">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 italic">
             {locale === "ua" ? "ГОТОВІ ДО СПОКОЮ?" : "READY FOR PEACE?"}
          </h2>
          <p className="text-white/50 text-base mb-12 max-w-md mx-auto">
             {dict.trust.replyHint}. Залишайтеся на тижні та місяці у справжньому домі.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href={contacts.telegramUrl}
              className="px-10 py-5 rounded-2xl glass font-bold text-xs uppercase tracking-[.3em] hover:neon-border-blue transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              href={contacts.bookingUrl}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-accent-peach to-accent-indigo text-white font-bold text-xs uppercase tracking-[.3em] shadow-2xl shadow-accent-indigo/30 hover:scale-105 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

