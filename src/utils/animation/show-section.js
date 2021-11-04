/*
* Hesapkurdu Arge
* Animations for Html Elements
*/

'use strict';

/*
* Hedef section'ın gorunme animasyonu
* @param {Jquery Element, int, string} $e, $h, $pad is required.
*/
export const showSection = (e, h, pad, speed = 750) => {
    e.animate({
        opacity: 1,
        height: h,
        padding: pad
    }, speed, () => {
        e.css('height', '100%');
    });
};
