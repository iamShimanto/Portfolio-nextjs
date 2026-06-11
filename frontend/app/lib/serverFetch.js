// Server-side only fetch helper — used in Server Components and page.js
// next: { revalidate } controls ISR — data refreshes every N seconds

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function serverFetch(endpoint, revalidate = 60) {
  try {
    const res = await fetch(`${BASE}${endpoint}`, {
      next: { revalidate },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
