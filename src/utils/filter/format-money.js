/**
 * Converts to money type.
 *
 * @param {int|string} data
 * @param {int|null} fixed - (default:2)
 * @return {int}
 */

export const formatMoney = (data, fixed = 2) => {
    data = data.toString().replace(/,/g, '.');
    data = Number(data).toFixed(fixed);
    data = data.toString().split('.').join(',');
    return data.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
