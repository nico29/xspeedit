/**
 * Special error thrown when a tring to fill a package that
 * has not enough room available.
 * @extends Error
 */
class PackageNotEnoughSpace extends Error {
    /**
     * Initiate a new PackageNotEnoughSpace instance
     * @param {Number} capacity       - The initial capacity of the package
     * @param {Number} remainingSpace - The remaining space in the package
     */
    constructor (capacity, remainingSpace) {
        super(`Not enough space in the package. Capacity: ${capacity} Remaining space: ${remainingSpace}`);
    }
}

/**
 * Class representing a package to fill with various things.
 */
class Package {
    /**
     * Initiate a new Package instance
     * @param {Number} capacity - The initial capacity of the package
     */
    constructor (capacity) {
        /**
         * The maximum amount of things that can be stored in the package
         * @name Package#capacity
         * @type Number
         * @readonly
         */
        this.capacity = capacity;
        Object.freeze(this.capacity);
        /**
         * How many things can still be stored in the package
         * @name Package#remainingSpace
         * @type Number
         * @readonly
         */
        this.remainingSpace = capacity;
        /**
         * What is stored inside the package
         * @name Package#content
         * @type Array<Number>
         * @readonly
         */
        this.content = [];
    }

    /**
     * Add things to the package.
     * @example
     * const pkg = new Package(10);
     * pkg.add(1, 2, 3);
     * // add calls can be chained
     * pkg.add([4, 4]).add([5, 1]);
     * @param {(...Number|Array<Number>)} things - The things to store in the package
     * @returns {Package}                        - Your package instance
     * @throws {PackageNotEnoughSpace}           - When adding something bigger than the remaining space
     */
    add (...things) {
        for (let thing of things) {
            if (this.remainingSpace >= thing) {
                this.content.push(thing);
                this.remainingSpace -= thing;
            } else {
                throw new PackageNotEnoughSpace(this.capacity, this.remainingSpace);
            }
        }
        return this;
    }

    /**
     * Remove things from the package.
     * @example
     * const pkg = new Package(10);
     * pkg.add(1, 2, 3);
     * pkg.remove(1);
     * // remove calls can be chained
     * pkg.remove(2).remove(3);
     * @param {(...Number|Array<Number>)} things - The things to drop from the package
     * @returns {Package}                        - Your package instance
     */
    remove (...things) {
        for (let thing of things) {
            const position = this.content.indexOf(thing);
            if (position > -1) {
                this.content.splice(position, 1);
                this.remainingSpace += thing;
            }
        }
        return this;
    }

    /**
     * Check if the package is full or not
     * @example
     * const pkg = new Package(5);
     * pkg.isFull();
     * // ➡️ false
     * pkg.add(5);
     * pkg.isFull();
     * // ➡️ true
     * @returns {Boolean} - `true` if the package is full
     */
    isFull () {
        return this.remainingSpace === 0;
    }

    /**
     * Remove everythings from the package
     * @example
     * const pkg = new Package(5);
     * pkg.add(2, 3);
     * pkg.empty();
     * pkg.remainingSpace;
     * // ➡️ 5
     * @returns {Package} - Your package instance
     */
    empty () {
        return this.remove(...this.content);
    }
}

/**
 * Classes for Package manipulation
 * @module package
 */
module.exports = {
    /**
     * @see Package
     */
    Package,
    /**
     * @see PackageNotEnoughSpace
     */
    PackageNotEnoughSpace
};
