const TOKEN_KEY = 'token';
const BOOKING_IDS_PREFIX = 'bookingIds:';

//token jwt

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

//IDs de reservas, separados POR USUARIO para que cada cuenta vea solo las suyas.
//userKey = el username (email) del usuario autenticado.

function bookingKey(userKey: string): string {
  return `${BOOKING_IDS_PREFIX}${userKey}`;
}

export function getBookingIds(userKey: string): number[] {
  if (!userKey) return [];
  const raw = localStorage.getItem(bookingKey(userKey));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

export function addBookingId(userKey: string, id: number): void {
  if (!userKey) return;
  const ids = getBookingIds(userKey);
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(bookingKey(userKey), JSON.stringify(ids));
  }
}

//reemplaza la lista completa (para limpiar ids obsoletos que ya no son del usuario)
export function setBookingIds(userKey: string, ids: number[]): void {
  if (!userKey) return;
  localStorage.setItem(bookingKey(userKey), JSON.stringify(ids));
}
