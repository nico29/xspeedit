class PackageNotEnoughSpace extends Error {
    constructor (capacity, remainingSpace) {
        super(`Not enough space in the package. Capacity: ${capacity} Remaining space: ${remainingSpace}`);
    }
}

class Package {
    constructor (capacity) {
        this.capacity = capacity;
        Object.freeze(this.capacity);
        this.remainingSpace = capacity;
        this.content = [];
    }

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

    isFull () {
        return this.remainingSpace === 0;
    }

    empty () {
        return this.remove(...this.content);
    }
}

module.exports = Package;
module.exports.PackageNotEnoughSpace = PackageNotEnoughSpace;
