/* eslint no-magic-numbers: 0 */
const PackingChain = require('../src/packingChain');

describe('PackingChain test suite', () => {
    const CHAIN_CAPACITY = 10;
    let chain;
    beforeEach(() => {
        chain = new PackingChain(CHAIN_CAPACITY, '/');
    });
    afterEach(() => {
        chain = undefined;
    });
    describe('PackingChain#constructor test suite', () => {
        test('sets up the chain', () => {
            expect(chain.packageCapacity).toEqual(CHAIN_CAPACITY);
            expect(chain.packageSpacer).toEqual('/');
            expect(chain.packages).toEqual(expect.any(Array));
        });
    });
    describe('PackingChain#pack test suite', () => {
        test('return the packages', () => {
            const packages = chain.pack();
            expect(packages).toEqual(expect.any(Array));
            expect(packages).toHaveLength(0);
        });
        test('create new packages with content', () => {
            const packages = chain.pack([9]);
            expect(packages).toHaveLength(1);
            expect(packages[0].content).toEqual(expect.arrayContaining([9]));
        });
        test('open new packages if too many things to pack', () => {
            const packages = chain.pack([9, 8, 7]);
            expect(packages).toHaveLength(3);
        });
        test('fill latest openned package with new things if room', () => {
            const packages = chain.pack([1, 1, 1, 4, 3]);
            expect(packages).toHaveLength(1);
        });
    });
    describe('PackingChain#ship test suite', () => {
        test('send the string representation of the packages', () => {
            chain.pack([10]);
            const delivery = chain.ship();
            expect(delivery).toEqual(expect.any(String));
        });
        test('delivery should contain the chain spacer', () => {
            const SPACER = '📦';
            chain = new PackingChain(CHAIN_CAPACITY, SPACER);
            chain.pack([10, 9]);
            const delivery = chain.ship();
            expect(delivery).toMatch(new RegExp(SPACER));
        });
    });
    describe('PackingChain#clear test suite', () => {
        test('reset all the things', () => {
            chain.pack([9, 9, 9, 9]);
            chain.clear();
            expect(chain.packages).toHaveLength(0);
        });
    });
});
