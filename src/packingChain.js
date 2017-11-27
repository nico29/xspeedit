const Package = require('./package');
const PackageNotEnoughSpace = Package.PackageNotEnoughSpace;

class PackingChain {
    constructor (packageCapacity, packageSpacer) {
        this.packageCapacity = packageCapacity;
        this.packageSpacer = packageSpacer;
        this.packages = [];
    }


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

    ship () {
        let delivery = this.packages.map(pkg => pkg.content.join(''));
        delivery = delivery.join(this.packageSpacer);
        return delivery;
    }

    clear () {
        this.packages.length = 0;
        return this;
    }
}

module.exports = PackingChain;
