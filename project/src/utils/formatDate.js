/**
 * Formats a date string into a more readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string (e.g., "January 15, 2025")
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

/**
 * Calculates the time difference between now and a given date
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Time ago string (e.g., "2 days ago")
 */
export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  
  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? 'just now' : `${seconds} seconds ago`;
  }
};