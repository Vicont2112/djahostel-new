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
          Місце для<br />
          глибокої<br />
          <span className="text-[#c9a063]">праці.</span>
        </h2>

        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/70">
          Тут живуть місяцями. Тут працюють, створюють і відпочивають.
          Без галасу. Без випадкових людей. Тільки твій потік.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Інтровертна атмосфера
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Ми збудували простір для тих, хто виснажується від зайвих контактів.
              Тут поважають особистий простір так само сильно, як і тишу.
            </p>
          </div>

          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Тиша як сервіс
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Після 22:00 хостел занурюється у повний спокій.
              Господар на місці, щоб жоден зайвий звук не порушив вашу
              концентрацію або глибокий сон.
            </p>
          </div>

          <div className="rounded-none border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:border-[#c9a063]/50">
            <h3 className="mb-4 text-xl font-bold text-[#c9a063]">
              Фокус на Дії
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Ми не просто житло. Ми — акселератор для ваших проєктів.
              Високі стелі, зручні робочі зони та атмосфера «Deep Work».
            </p>
          </div>
        </div>

        <div className="mt-16 border-l-4 border-[#c9a063] bg-white/[0.03] p-8 backdrop-blur-sm">
          <h3 className="font-serif text-2xl text-[#e2e2e4]">
            Чому інтроверти обирають нас?
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a063]">
                Безпека кордонів
              </h4>
              <p className="text-sm font-light leading-relaxed text-white/60">
                Тут нормально — не вітатися щоразу, якщо ви в навушниках.
                Тут нормально — бути частиною спільноти, залишаючись наодинці.
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a063]">
                Жодних вечірок
              </h4>
              <p className="text-sm font-light leading-relaxed text-white/60">
                Ми відмовляємо галасливим компаніям ще на етапі бронювання.
                У нас залишаються ті, кому потрібна база для росту.
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
