module.exports.randomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};