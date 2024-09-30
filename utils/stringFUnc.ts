export function truncateText(text: string) {
  if (text.length <= 100) {
    return text;
  }
  return text.slice(0, 100) + "...";
}
