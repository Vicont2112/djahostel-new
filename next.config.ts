import type { NextConfig } from "next";

/**
 * output: 'standalone' — збирає `.next/standalone` з мінімальним runtime для Node.
 *
 * Деплой на Ukrnames VDS (типовий стек):
 * 1. На сервері: Node 20+, `npm ci && npm run build`.
 * 2. Копіюйте на VDS разом з додатком: `.next/standalone`, `.next/static`, `public/`.
 * 3. Запуск: `node .next/standalone/server.js` (або через PM2 нижче).
 * 4. PM2 (`ecosystem.config.cjs`): script — шлях до `server.js` у standalone;
 *    cwd — папка standalone; env `PORT=3000`, `HOSTNAME=127.0.0.1`.
 * 5. Nginx: `proxy_pass http://127.0.0.1:3000;` для вашого домену;
 *    для статики можна `location /_next/static` кешувати довго.
 * 6. Після збірки переконайтесь, що `public/` і `.next/static` лежать поруч
 *    з `standalone` так, як очікує Next (див. офіційну документацію standalone).
 *
 * Vercel: під час збірки виставлено `VERCEL=1` — `standalone` вимикається,
 * інакше сторінка на vercel.app може бути порожньою / некоректною.
 */
const onVercel = Boolean(process.env.VERCEL);

const nextConfig: NextConfig = {
  ...(!onVercel ? { output: "standalone" as const } : {}),

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
