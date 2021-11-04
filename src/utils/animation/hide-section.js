/*
* Hesapkurdu Arge
* Animations for Html Elements
*/

'use strict';

/*
* Hedef section'ın kapanma animasyonu
* @param {Jquery Element} $e is required.
*/
export const hideSection = (e) => {
    e.animate({
        opacity: 0,
        height: '0',
        padding: '0'
    }, 500);
};
