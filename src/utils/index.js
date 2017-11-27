/**
 * Some utils functions to manipulate arrays and numbers
 * @module utils
 */
module.exports = {
    /**
     * Convert a sequence of numbers (string or number) into an array of numbers
     * @param {Number|String} input - The input to process
     * @returns {Array<Number>}     - An array of numbers
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

        const numbers = [];
        for (let string of processedInput) {
            const number = Number.parseInt(string);
            if (!Number.isNaN(number)) numbers.push(number);
            else {
                /* eslint-disable no-console */
                console.warn(`\t⚠️ Cannot pack '${string}', this thing will be discarded.`);
                /* eslint-enable no-console */
                continue;
            }
        }
        return numbers;
    },

    /**
     * Check if all members of an array are numbers
     * @param {Array} input - The array to check
     * @returns {Boolean}   - Are all members numbers
     */
    isArrayOfNumbers (input = []) {
        if (!(input instanceof Array)) {
            throw new TypeError('ensureArrayOfNumbers argument should be an array');
        }
        return input.every(element => element && typeof element === 'number');
    }
};
