/**
 * Defines a calculation of color as RGB (red, green, blue).
 */
export interface IRGB {
    red: number;
    green: number;
    blue: number;
}

/**
 * Defines a calculation of color as HSL (hue, saturation, lightness).
 */
export interface IHSL {
    hue: number;
    saturation: number;
    lightness: number;
}

/**
 * Defines a normalized time as hours, minutes, and seconds.
 */
export interface ITime {
    hours: string;
    mins: string;
    secs: string;
}