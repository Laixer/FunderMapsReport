
/**
 * Credit https://stackoverflow.com/a/55292366
 */
export function trimChar(str: string, ch: string) {
  let start = 0, 
      end = str.length;

  while(start < end && str[start] === ch)
      ++start;

  while(end > start && str[end - 1] === ch)
      --end;

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}
// Based on trimChar
export function trimTrailingChar(str: string, ch: string) {
  let end = str.length;

  while(end > 0 && str[end - 1] === ch)
    --end;

  return (end < str.length) ? str.substring(0, end) : str;
}
// Based on trimChar
export function trimLeadingChar(str: string, ch: string) {
  let start = 0;

  while(start < str.length && str[start] === ch)
      ++start;

  return (start > 0) ? str.substring(start, str.length) : str;
}