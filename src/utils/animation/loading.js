/*
* Hesapkurdu Arge
* Loading Animation for Html Elements
*/

'use strict';
import $ from "jquery";

const classes = {
    pointerNone: 'pointer--none',
    displayNone: 'd-none',
    loadingShow: 'loading--show',
    loadingHide: 'loading--hide'
};

let $obj = {
    loading: $('#js-form-loading')
};

/*
* Start and stop loading loading animation for html Elements.
*/
export const loading = {
    start: (obj = $obj.loading) => {
        obj.removeClass(classes.pointerNone + ' ' + classes.displayNone + ' ' + classes.loadingHide).addClass(classes.loadingShow);
    },
    end: (obj = $obj.loading) => {
        obj.removeClass(classes.loadingShow).addClass(classes.pointerNone + ' ' + classes.loadingHide);
    }
};
