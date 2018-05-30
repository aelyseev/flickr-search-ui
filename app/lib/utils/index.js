export function beautifyNumber(num, sep = ',') {
  return num
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})(?=\d)/g, `$1${sep}`)
    .split('')
    .reverse()
    .join('');
}
