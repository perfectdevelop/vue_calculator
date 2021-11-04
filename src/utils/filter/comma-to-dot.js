/**
 * function that clears non-number values
 *
 * @param {int|string} data
 * @return {string}
 */

export const commaToDot = (data) => {
    return data.toString().replace(/,/g, '.');
};
