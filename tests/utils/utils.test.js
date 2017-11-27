/* eslint no-magic-numbers: 0 */
const { toNumberArray, isArrayOfNumbers } = require('../../src/utils');

describe('utils test suite', () => {
    describe('toStringArray test suite', () => {
        test('throw is inccorect input', () => {
            expect(() => toNumberArray({})).toThrowError(TypeError);
        });
        test('convert String to Array', () => {
            const input = '123456789';
            const output = toNumberArray(input);
            expect(output).toEqual(expect.any(Array));
            expect(output).toHaveLength(9);
        });
        test('convert Number to Array', () => {
            const input = 123456789;
            const output = toNumberArray(input);
            expect(output).toEqual(expect.any(Array));
            expect(output).toHaveLength(9);
        });
    });

    describe('isArrayOfNumbers test suite', () => {
        test('throw if argument is not an array', () => {
            expect(() => isArrayOfNumbers(1)).toThrowError(TypeError);
        });
        test('valid input', () => {
            expect(isArrayOfNumbers([1, 2])).toEqual(true);
        });
        test('invalid input', () => {
            expect(isArrayOfNumbers(['1', '2'])).toEqual(false);
        });
    });
});
