const STRAPI_PUBLIC_URL = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337').replace(
  /\/$/,
  ''
);

/** Public Strapi origin (browser + `next/image`). */
export function getStrapiURL(path: string = '') {
  return `${STRAPI_PUBLIC_URL}${path}`;
}

/**
 * Origin for server-side fetches (RSC). Use `STRAPI_URL` when Strapi is only reachable
 * on an internal hostname (Docker) while `NEXT_PUBLIC_STRAPI_API_URL` is the public URL.
 */
export function getStrapiServerOrigin() {
  const fromEnv = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
  return fromEnv.replace(/\/$/, '');
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) return url;

  // Otherwise prepend the Strapi URL
  return `${STRAPI_PUBLIC_URL}${url}`;
}

export async function fetchStrapi(
  endpoint: string,
  query?: Record<string, string>,
  options: RequestInit = {}
) {
  try {
    const queryString = query 
      ? `?${new URLSearchParams(query).toString()}`
      : '';
    
    const requestUrl = getStrapiURL(`/api/${endpoint}${queryString}`);

    const response = await fetch(requestUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    throw new Error('Failed to fetch from Strapi');
  }
}
