const PackingChain = require('./src/packingChain');
const { toNumberArray } = require('./src/utils');

const input = 163841689525773;
const PACKAGE_CAPACITY = 10;
const packingChain = new PackingChain(PACKAGE_CAPACITY);
const packages = packingChain.pack(toNumberArray(input));
console.log(packages.length);
for (let pkg of packages) {
    console.log(pkg.content);
}
