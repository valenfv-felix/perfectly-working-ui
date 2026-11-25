export function formatMoney(value: number, currency = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });
  return formatter.format(value);
}

export function formatTotal(value: number): string {
  return '$' + (Math.round(value * 100) / 100).toLocaleString('en-US');
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split('-');
  return `${month}/${day}/${year}`;
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} ${iso.slice(11, 16)}`;
}
