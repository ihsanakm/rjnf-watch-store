const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

export function getStrapiURL(path: string = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) return url;

  // Otherwise prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
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
