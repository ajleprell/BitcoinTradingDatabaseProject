export default (num) => {
  // Ensure num is a string and split at the decimal point
  const parts = num.toString().split(".");

  // Add commas to the integer part only
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Rejoin the integer and decimal parts, if the decimal exists
  return parts.join(".");
};
