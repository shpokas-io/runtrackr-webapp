export function formatDuration(movingTimeString) {
  if (!movingTimeString) return "N/A";
  const minutesMatch = movingTimeString.match(/(\d+)\s*minutes/);
  if (minutesMatch) {
    const minutes = parseInt(minutesMatch[1], 10);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }
  return "N/A";
}
