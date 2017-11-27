/* eslint no-magic-numbers: 0 */
const { Package, PackageNotEnoughSpace } = require('../src/package');

const PACKAGE_CAPACITY = 10;
describe('package test suite', () => {
    let pkg;
    beforeEach(() => { pkg = new Package(PACKAGE_CAPACITY); });
    afterEach(() => { pkg = undefined; });

    test('package initialistion', () => {

        expect(pkg.content).toEqual(expect.any(Array));
        expect(pkg.capacity).toEqual(PACKAGE_CAPACITY);
        expect(pkg.remainingSpace).toEqual(pkg.capacity);
    });

    describe('package#add test suite', () => {
        test('small things', () => {
            pkg.add(1, 2, 3);
            expect(pkg.content.length).toEqual(3);
            expect(pkg.remainingSpace).toEqual(4);
        });
        test('lot of small things', () => {
            for (let cursor = 0; cursor < PACKAGE_CAPACITY; cursor++) {
                pkg.add(1);
            }
            expect(pkg.isFull()).toBe(true);
            expect(() => pkg.add(1)).toThrowError(PackageNotEnoughSpace);
        });
        test('bigger thing', () => {
            expect(() => pkg.add(11)).toThrowError(PackageNotEnoughSpace);
        });
    });

    describe('package#remove test suite', () => {
        beforeEach(() => pkg.add(6, 4));
        test('remove things', () => {
            pkg.remove(6);
            expect(pkg.content.length).toEqual(1);
            expect(pkg.content).toEqual(expect.arrayContaining([4]));
            expect(pkg.isFull()).toEqual(false);
            expect(pkg.remainingSpace).toEqual(6);
        });
        test('remove things that do not exist', () => {
            pkg.remove(2);
            expect(pkg.isFull()).toEqual(true);
        });
    });

    describe('package#empty test suite', () => {
        test('remove all the things', () => {
            pkg.add(7, 3);
            pkg.empty();
            expect(pkg.content).toHaveLength(0);
        });
    });
});
