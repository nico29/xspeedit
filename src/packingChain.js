/**
 * @module packingChain
 */

const { Package, PackageNotEnoughSpace } = require('./package');

class PackingChain {
    /**
     * Initiate a new PackingChain instance
     * @param {Number} packageCapacity - The capacity of all package in the chain
     * @param {String} packageSpacer   - How to separate packages in the truck
     */
    constructor (packageCapacity, packageSpacer) {
        /**
         * The capacity of all package in this chain instance
         * @name PackingChain#packageCapacity
         * @type Number
         * @readonly
         */
        this.packageCapacity = packageCapacity;
        /**
         * The delimiter between packages in the chain instance truck
         * @name PackingChain#packageSpacer
         * @type String
         * @readonly
         */
        this.packageSpacer = packageSpacer;
        /**
         * All the packages handled by this instance
         * @name PackingChain#packages
         * @type Array<Package>
         * @readonly
         */
        this.packages = [];
    }

    /**
     * Fill packages with things
     * @example
     * const chain = new PackingChain(10, '/');
     * chain.pack([1, 2, 4], [5, 6, 7]);
     * @param {...Array<Number>} - The things to pack
     * @returns {Array<Package>} - The packages, as full as possible
     * @throws {Error}           - If an unknown error occurs
     */
    pack () {
        let things = [...arguments].reduce((prev, current) => prev.concat(current), []);
        things = things.sort((n1, n2) => n2 - n1);
        for (let thing of things) {
            let stored = false;
            for (let cursor = this.packages.length - 1 ; cursor >= 0; cursor--) {
                let pkg = this.packages[cursor];
                try {
                    pkg.add(thing);
                    stored = true;
                    break;
                } catch (e) {
                    if (e instanceof PackageNotEnoughSpace) continue;
                    else {
                        throw new Error('💥 Something went really wrong with your packages!');
                    }
                }
            }
            if (!stored) {
                let pkg = new Package(this.packageCapacity);
                this.packages.push(pkg);
                pkg.add(thing);
            }
        }
        return this.packages;
    }

    /**
     * Send the packages to the customers in a 🚚
     * Packages will be separated by the instance packageSpacer
     * @example
     * const chain = new PackingChain(10, '/');
     * chain.pack(9, 8, 7);
     * chain.ship();
     * // ➡️ 9/8/7
     * @returns {String} - 📦 in the 🚚
     */
    ship () {
        let delivery = this.packages.map(pkg => pkg.content.join(''));
        delivery = delivery.join(this.packageSpacer);
        return delivery;
    }

    /**
     * Remove all the packages for this chain, for a fresh start
     * @returns {PackingChain} - Your PackingChain instance
     */
    clear () {
        this.packages.length = 0;
        return this;
    }
}

/**
 * Create a new packing chain
 */
module.exports = PackingChain;
