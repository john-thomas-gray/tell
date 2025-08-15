/**
 * Calculate the offset in seconds between now and the movie start (UTC)
 * @param movieStart - Date or string representing the movie start time
 * @returns offset in seconds, rounded
 */
export default function getOffsetSeconds(movieStart: string | Date): number {
  if (!movieStart) return 0;

  // Convert to Date object
  const movieStartDate =
    movieStart instanceof Date ? movieStart : new Date(movieStart);

  // Current time in UTC
  const nowUTC = new Date();

  // Offset in milliseconds
  const offsetMs = nowUTC.getTime() - movieStartDate.getTime();

  // Convert to seconds and round
  const offsetSeconds = Math.round(offsetMs / 1000);

  // Ensure non-negative
  return Math.max(offsetSeconds, 0);
}
