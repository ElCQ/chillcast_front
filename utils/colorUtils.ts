
/**
 *  Devuelve una variante más oscura del color hexadecimal recibido
 * 
 * @param hex 
 * @param factor 
 * @returns 
 */
export function getDarkerColor(hex: string, factor: number = 0.8): string {
    let color = hex.replace('#', '');
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = Math.floor(((num >> 16) & 0xFF) * factor);
    let g = Math.floor(((num >> 8) & 0xFF) * factor);
    let b = Math.floor((num & 0xFF) * factor);
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}
