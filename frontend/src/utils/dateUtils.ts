export function toISOStringZ(datetimeLocal: string): string {
 if (!datetimeLocal) return '';
  return new Date(datetimeLocal).toISOString();
}


export function formatDisplayDate(iso: string | undefined | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}
