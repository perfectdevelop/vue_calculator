/**
 * function that clears non-number values
 *
 * @param {int|string} data
 * @return {int}
 */

export const clearNaN = (data) => {
    return Number(data.toString().replace(/[^0-9]/g, ''));
};
