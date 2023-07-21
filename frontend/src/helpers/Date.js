export function formatDateToCustomFormat(dateStr) {
  const dateObj = new Date(dateStr);
  const options = {
    weekday: "short", // Displays the abbreviated weekday (e.g., Sat)
    month: "short", // Displays the abbreviated month name (e.g., Jul)
    day: "numeric", // Displays the day of the month (e.g., 15)
    year: "numeric", // Displays the year (e.g., 2023)
    hour: "numeric", // Displays the hour (e.g., 00)
    minute: "numeric", // Displays the minute (e.g., 00)
    second: "numeric", // Displays the second (e.g., 00)
    timeZoneName: "short", // Displays the abbreviated time zone (e.g., GMT+0530)
  };

  // Convert to the custom format
  const formattedDate = dateObj.toLocaleString("en-US", options);

  return formattedDate;
}
