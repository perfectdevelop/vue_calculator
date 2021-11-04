/*
* Hesapkurdu Arge
* Animations for Html Elements
*/

'use strict';
import $ from "jquery";

/*
* Scrolling to Target Element by Centering on Screen
* @param {Jquery Element} $e is required.
*/
export const scrollToElement = (e, speed = 500, half = true) => {
    let elOffset = e.offset().top;
    let elHeight = e.height();
    let elWidth = e.width();
    let windowHeight = $(window).height();
    let offset = elOffset;
    if (half && elHeight < windowHeight) {
        offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
    } else {
        offset = (elWidth > 600) ? elOffset - 20 : elOffset - 80;
    }
    $('html, body').animate({ scrollTop: offset }, speed);
};
