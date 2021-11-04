/**
 * function that clears turkish special character values
 *
 * @param {string} text
 * @return {string}
 */

export const tr2en = (text) => {
    const trMap = [
        ['çÇ', 'c'],
        ['ğĞ', 'g'],
        ['şŞ', 's'],
        ['üÜ', 'u'],
        ['ıİ', 'i'],
        ['öÖ', 'o']
    ];

    trMap.forEach(function (element, index) {
        text = text.replace(new RegExp('[' + element[0] + ']', 'g'), element[1]);
    });

    return text.replace(/[^-a-zA-Z0-9\s]+/ig, '')
        .replace(/\s/gi, '-')
        .replace(/[-]+/gi, '-')
        .toLowerCase();
};
