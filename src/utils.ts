import { DateTime } from 'luxon';
import { IHSL, IRGB, ITime } from './types';

/**
 * Concatenates the current local time's 2-digit hour, 2-digit minutes, and
 * 2-digit seconds to generate a hash-less HTML color hex code.
 * 
 * @param {ITime} time 
 * @returns {string}
 */
export const getHexFromTime = ( time: ITime ): string => {
    return `${time.hours}${time.mins}${time.secs}`;
};

/**
 * Simple helper that prefixes a hash-less HTML color hex code with a hash.
 * 
 * @param {string} hex 
 * @returns {string}
 */
export const getHexFormatted = ( hex: string ): string => `#${hex}`;

/**
 * Converts RGB (red, green, blue) to HSL (hue, saturation, lightness).
 * 
 * @param {IRGB} rgb 
 * @returns {IHSL}
 */
export const getHslFromRgb = ( rgb: IRGB ): IHSL => {
    let hsl: IHSL = {
        hue: 0,
        saturation: 0,
        lightness: 0
    };

    try {
        const red = ( rgb.red / 255 );
        const green = ( rgb.green / 255 );
        const blue = ( rgb.blue / 255 );

        const channelMin = Math.min( red, green, blue );
        const channelMax = Math.max( red, green, blue );
        const delta = ( channelMax - channelMin );

        let h = 0,
            s = 0,
            l = 0;

        // Calculate saturation.
        if ( delta === 0 )
            h = 0;
        else if ( channelMax === red )
            h = (( green - blue ) / delta ) % 6;
        else if ( channelMax === green )
            h = ( blue - red ) / delta + 2;
        else
            h = ( red - green ) / delta + 4;
        h = Math.round( h * 60 );
        if ( h < 0 )
            h += 360;

        // Calculate lightness.
        l = ( channelMax + channelMin ) / 2;

        // Calculate saturation.
        s = ( delta === 0 )
            ? 0
            : delta / ( 1 - Math.abs( 2 * l - 1 ));

        s = +( s * 100 ).toFixed( 1 );
        l = +( l * 100 ).toFixed( 1 );

        hsl.hue = h;
        hsl.saturation = s;
        hsl.lightness = l;
    } catch ( err ) {
        console.debug( '[utils] :: getHslFromRgb() :: Unable to convert RGB to HSL.', rgb, err );
    }

    return hsl;
};

/**
 * Simple helper that returns HSL values in a commonly used string format of
 * "hsl( HUE, SATURATION%, LIGHTNESS% )".
 * 
 * @param {IHSL} hsl 
 * @returns {string}
 */
export const getHslFormatted = ( hsl: IHSL ): string =>
    `hsl( ${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}% )`;

/**
 * Converts an HTML color hex code to RGB (red, green, blue).
 * 
 * @param {string} hex 
 * @returns {IRGB}
 */
export const getRgbFromHex = ( hex: string ): IRGB => {
    let rgb: IRGB = {
        red: 0,
        green: 0,
        blue: 0
    };

    try {
        if ( hex.length === 7 )
            hex = hex.substr( 1 );

        if ( hex.length !== 6 )
            throw new Error( 'Hex must be six characters in length.' );

        const parts = hex.match( /.{1,2}/g );
        if ( parts === null || parts.length !== 3 )
            throw new Error( 'Invalid hex code.' );

        rgb.red = parseInt( parts[ 0 ], 16 );
        rgb.green = parseInt( parts[ 1 ], 16 );
        rgb.blue = parseInt( parts[ 2 ], 16 );
    } catch ( err ) {
        console.debug( '[utils] :: getRgbFromHex() :: Unable to convert hex to RGB.', hex, err );
    }

    return rgb;
};

/**
 * Simple helper that returns RGB values in a commonly used string format of
 * "rgb( RED, GREEN, BLUE )".
 * 
 * @param {IRGB} rgb 
 * @returns {string}
 */
export const getRgbFormatted = ( rgb: IRGB ): string =>
    `rgb( ${rgb.red}, ${rgb.green}, ${rgb.blue} )`;

/**
 * Shades an RGB value by percent to either lighten (positive percent) or
 * darken (negative percent), and returns as a formatted string.
 * 
 * @param {IRGB} rgb 
 * @param {number} percent 
 * @returns {string}
 */
export const getRgbShaded = ( rgb: IRGB, percent: number ): string => {
    let red = rgb.red * ( 100 + percent ) / 100,
        green = rgb.green * ( 100 + percent ) / 100,
        blue = rgb.blue * ( 100 + percent ) / 100;

    if ( red > 255 ) red = 255;
    if ( green > 255 ) green = 255;
    if ( blue > 255 ) blue = 255;

    return getRgbFormatted({ red, green, blue });
};

/**
 * Fetches the current time as an object containing 2-digit hour, 2-digit minute,
 * and 2-digit second.
 * 
 * @returns {ITime}
 */
export const getTimeNow = (): ITime => {
    const now = DateTime.now();

    return {
        hours: now.toFormat( 'hh' ),
        mins: now.toFormat( 'mm' ),
        secs: now.toFormat( 'ss' )
    };
};