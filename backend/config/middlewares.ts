import type { Core } from '@strapi/strapi';

const devOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

function explicitOrigins(): string[] {
  const fromEnv =
    process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
  return Array.from(new Set([...devOrigins, ...fromEnv]));
}

const vercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

/**
 * Browser origins allowed to call the Strapi REST API (Next.js on Vercel, local dev, etc.).
 *
 * - Set `CORS_ORIGINS` on the Strapi host: comma-separated URLs, e.g.
 *   `https://your-app.vercel.app,https://www.example.com`
 * - Optional: `CORS_ALLOW_VERCEL_PREVIEWS=true` allows any `https://*.vercel.app` preview URL.
 *   Turn off in production if you only want fixed domains.
 */
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: (ctx: { request: { header: { origin?: string } } }) => {
        const requestOrigin = ctx.request.header.origin;
        if (!requestOrigin) return false;

        const allowed = explicitOrigins();
        if (allowed.includes(requestOrigin)) return requestOrigin;

        if (process.env.CORS_ALLOW_VERCEL_PREVIEWS === 'true' && vercelPreview.test(requestOrigin)) {
          return requestOrigin;
        }

        return false;
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
