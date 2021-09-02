export default function (buffer, start, len, value) {
  for (let i = 0; i < len; i++) {
    buffer[start + i] = value / Math.pow(256, len - i - 1);
  }
}