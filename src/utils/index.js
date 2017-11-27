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

        const numbers = [];
        for (let string of processedInput) {
            const number = Number.parseInt(string);
            if (!Number.isNaN(number)) numbers.push(number);
            else {
                console.warn(`\t⚠️ Cannot pack '${string}', this thing will be discarded.`);
                continue;
            }
        }
        return numbers;
    },

    isArrayOfNumbers (input = []) {
        if (!(input instanceof Array)) {
            throw new TypeError('ensureArrayOfNumbers argument should be an array');
        }
        return input.every(element => element && typeof element === 'number');
    }
};
