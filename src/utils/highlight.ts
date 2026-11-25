export function highlight(text: string, query: string): string {
  if (!query) return text;
  const pattern = new RegExp(`(${query})`, 'gi');
  return text.replace(pattern, '<mark>$1</mark>');
}
