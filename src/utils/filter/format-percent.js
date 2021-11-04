/**
 * Converts to number type with percent.
 *
 * @param {int|string} data
 * @return {string}
 */

export const formatPercent = (data) => {
    return data.toString().replace(/[^0-9]/g, '').replace(/\B(?=(\d{2})+(?!\d))/g, ',');
};
