"use client";

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0b] px-4 py-20 sm:px-6 sm:py-28">
      {/* Subtle animated dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#c9a063]/40"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${15 + i * 15}%`,
              left: `${10 + i * 18}%`,
              animation: `floatDot 7s infinite ease-in-out ${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h2 className="font-serif text-[2.5rem] font-bold leading-tight text-[#e2e2e4] sm:text-5xl">
          Тихе місце<br />
          для справжнього<br />
          <span className="text-[#c9a063]">життя.</span>
        </h2>

        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/70">
          Ми створили простір для тих, хто цінує порядок, чистоту та спокій. 
          Багато хто заходить до нас на пару ночей, а залишається на місяці. 
          Тут все просто, чесно і налаштовано для життя в центрі Києва.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Власник на місці 24/7
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Я особисто слідкую за кожною деталлю. Ніяких адміністраторів-стажерів. 
              Ваш спокій і безпека — це моя щоденна робота і вибір.
            </p>
          </div>

          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Тиша як стандарт
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Після 22:00 хостел занурюється у повний спокій. 
              Ми відмовляємо галасливим компаніям ще на етапі бронювання, 
              щоб ви могли виспатись або зосередитись.
            </p>
          </div>

          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Налаштовано на довге
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Велика кухня, власні локери, швидкий інтернет та атмосфера «домовленості про тишу». 
              Це база для того, щоб ви ставали сильнішими у своїх проектах.
            </p>
          </div>
        </div>

        <div className="mt-16 border-l-4 border-[#c9a063] bg-white/[0.03] p-8 backdrop-blur-sm">
          <h3 className="font-serif text-2xl text-[#e2e2e4]">
            Чому обирають нас?
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a063]">
                Повага до кордонів
              </h4>
              <p className="text-sm font-light leading-relaxed text-white/60">
                У нас нормально не вітатися вдесяте за день, якщо ви зайняті. 
                Ми не нав'язуємо «ком'юніті» — ми даємо простір бути собою.
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a063]">
                Жодної суєти
              </h4>
              <p className="text-sm font-light leading-relaxed text-white/60">
                Ми відсікаємо все зайве. Тут залишаються ті, кому потрібна 
                надійна база в центрі міста без сюрпризів.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-12px); opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}
