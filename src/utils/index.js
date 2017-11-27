module.exports = {
    /**
     * Convert a sequence of number into an array of numbers
     * @param {Number|String} input - The input to process
     * @returns {Array}             - A array of numbers
     */
    toNumberArray (input = '') {
        let processedInput = [];
        if (typeof input === 'string') {
            processedInput = [...input];
        } else if (typeof input === 'number') {
            processedInput = [...`${input}`];
        } else {
            throw new TypeError('Input should be either a string or a number');
        }

        return processedInput.map(string => Number.parseInt(string));
    },

    isArrayOfNumbers (input = []) {
        if (!(input instanceof Array)) {
            throw new TypeError('ensureArrayOfNumbers argument should be an array');
        }
        return input.every(element => typeof element === 'number');
    }
};
