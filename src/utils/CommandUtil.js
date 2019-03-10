// Some useful additions to String prototypes
// Capitalizes the first letter in a string, and if onlyFirst is not true, convert all other letters to lowercase
String.prototype.toTitleCase = function (onlyFirst) {
    const first = this.charAt(0).toUpperCase();
    const rest = (onlyFirst) ? this.substr(1) : this.substr(1).toLowerCase();
    return first + rest;
};
// Applies toTitleCase() to all words in a string, separated by a delimeter
String.prototype.toTitleCaseAll = function (delim, onlyFirst) {
    const d = delim || ' ';
    return this.split(d).reduce((acc, cur) => {
        if (acc == '') return cur.toTitleCase(onlyFirst);
        return acc + d + cur.toTitleCase(onlyFirst);
    }, '');
};

// Export some useful things
module.exports = {
    emoji: {
        enabled: {
            true: '✅',
            false: '❌',
        },
    },
};