export function rgbToHex(r: number, g: number, b: number): string {
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
  if (a < 0 || a > 1) {
    throw new Error('Ungültiger Alpha-Wert! Der Alpha-Wert muss zwischen 0 und 1 liegen.');
  }
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${hexR}${hexG}${hexB}${alphaHex}`;
}

export function rgbStringToHex(rgb: string): string {
  const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*(?:\.\d+)?))?\)/.exec(rgb);
  if (!match) {
    if (rgb.startsWith('#') && rgb.length >= 4) {
      return rgb;
    }
    console.log(rgb);
    // throw new Error('Ungültiger RGB- oder RGBA-String!');
    return '#ff0000';
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const alpha = parseFloat(match[4] || '1');
  if (isNaN(alpha)) {
    throw new Error('Ungültiger Alpha-Wert!');
  }
  return match[0].startsWith('rgb') ? rgbToHex(r, g, b) : rgbaToHex(r, g, b, alpha);
}
