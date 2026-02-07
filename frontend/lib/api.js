export async function api(path, options = {}) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = base + path;
  const token = (typeof window !== 'undefined') ? localStorage.getItem('admin_token') : null;
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    const err = new Error(`API error ${res.status}: ${errText}`);
    err.status = res.status;
    throw err;
  }
  const text = await res.text();
  try { return JSON.parse(text || '{}'); } catch { return text; }
}
