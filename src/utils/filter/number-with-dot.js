/**
 * function that clears non-number values
 *
 * @param {int|string} data
 * @return {string}
 */

import { clearNaN } from './clear-nan';

export const numberWithDot = (data) => {
    data = clearNaN(data);
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
