export function formatString(str, ...replaceValue) {
  for (let i = 0; i < replaceValue.length; i++) {
    const regex = new RegExp(`\\{${i}\\}`, 'g');
    str = str.replace(regex, replaceValue[i]);
  }
  return str;
}
