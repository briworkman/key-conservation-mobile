export default (string, cutoff) => {
  if (string.length < cutoff) {
    return string;
  } else {
    let end = cutoff;
    const avoidChars = [" ", ",", ".", "!"];
    while (avoidChars.includes(string.charAt(end)) && end >= cutoff - 10) {
      end--;
    }
    return `${string.substring(0, end)}...`;
  }
};