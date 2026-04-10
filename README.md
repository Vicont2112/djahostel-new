# DJA Hostel — сайт (Next.js 15)

Маркетинговий сайт хостелу: hero, атмосфера, кімнати, форма бронювання (Apps Script за бажанням), AI-чат (мок).

**Репозиторій:** [github.com/Vicont2112/djahostel-new](https://github.com/Vicont2112/djahostel-new)

## Локально

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Vercel (тестовий деплой)

### Варіант 1 — імпорт з GitHub (найпростіше)

1. Відкрийте [**Import на Vercel**](https://vercel.com/new/import?framework=nextjs&hasDeploymentSource=github&repository-url=https%3A%2F%2Fgithub.com%2FVicont2112%2Fdjahostel-new).
2. Увійдіть у Vercel → оберіть репозиторій `Vicont2112/djahostel-new` → **Deploy**.
3. За потреби додайте **Environment Variables**: `SHEETS_WEBAPP_BASE_URL`, `SHEETS_WEBAPP_SECRET` (див. `.env.example`).

### Варіант 2 — GitHub Actions (деплой з кнопки в Actions)

1. На [vercel.com](https://vercel.com) створіть проєкт (або після першого імпорту з GitHub скопіюйте ID з **Settings → General**).
2. [Tokens](https://vercel.com/account/tokens) — створіть **token**.
3. У репозиторії GitHub: **Settings → Secrets and variables → Actions** — додайте:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. Вкладка **Actions** → workflow **Deploy to Vercel** → **Run workflow** (ручний запуск після налаштування секретів).

### Git push (якщо HTTP 400 на великому пакеті)

```bash
git config http.postBuffer 524288000
git config http.version HTTP/1.1
git push
```

## Self-host (VDS)

У `next.config.ts` увімкнено `output: 'standalone'` — див. коментарі в файлі для PM2 + Nginx.
