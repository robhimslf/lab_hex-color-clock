import {
    getHexFormatted,
    getHexFromTime,
    getHslFormatted,
    getHslFromRgb,
    getRgbFormatted,
    getRgbFromHex,
    getRgbShaded,
    getTimeNow
} from './utils';

/**
 * Every half-second, use the current time to calculate an HTML color hex
 * code, RGB, and HSL. Additionally, generate an accent color with which
 * to shade the meta display.
 * 
 * Updates the DOM with the values.
 */
setInterval( () => {
    const time = getTimeNow();
    const hex = getHexFromTime( time );
    const hexStr = getHexFormatted( hex );
    const rgb = getRgbFromHex( hex );
    const rgbStr = getRgbFormatted( rgb );
    const rgbShaded = getRgbShaded( rgb, 80 );
    const hsl = getHslFromRgb( rgb );
    const hslStr = getHslFormatted( hsl );

    const hoursElem = document.getElementById( 'hours' );
    if ( hoursElem ) hoursElem.innerHTML = time.hours;

    const minsElem = document.getElementById( 'mins' );
    if ( minsElem ) minsElem.innerHTML = time.mins;

    const secsElem = document.getElementById( 'secs' );
    if ( secsElem ) secsElem.innerHTML = time.secs;

    const hexElem = document.getElementById( 'hex' );
    if ( hexElem ) hexElem.innerHTML = hexStr;

    const rgbElem = document.getElementById( 'rgb' );
    if ( rgbElem ) rgbElem.innerHTML = rgbStr;

    const hslElem = document.getElementById( 'hsl' );
    if ( hslElem ) hslElem.innerHTML = hslStr;

    const metaElem = document.getElementById( 'meta' );
    if ( metaElem ) metaElem.style.color = rgbShaded;
    
    document.body.style.backgroundColor = hexStr;
}, 500 );