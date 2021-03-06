/* eslint no-console: 0 */
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const program = require('commander');

const { version } = require('./package.json');
const PackingChain = require('./src/packingChain');
const { toNumberArray, isArrayOfNumbers } = require('./src/utils');

// hack commander for usage display
program._name = 'npm';
program
    .version(version)
    .usage('run pack -- [options]')
    .option('-c, --capacity [capacity]', 'The package capacity. Defaults to 10')
    .option('-s, --separator [separator]', 'A string to separate packages to ship')
    .option('-t, --things [things]', 'The things to pack')
    .option('-f, --file [file]', 'A file containing a list of things to pack')
    .parse(process.argv);

const DEFAULT_CHAIN_CAPACITY = 10;
const DEFAULT_PACKAGE_SEPARATOR = '/';

if (!program.things && !program.file) {
    console.error('👮 Specify either a file to read or a sequence of things to package');
    process.exit(-1);
}

/**
 * Read the content of a file and convert it to a array of numbers
 * @async
 * @param {String} file              - the file to read
 * @returns {Promise<Array<Number>>} - The things to pack
 */
async function processFile (file) {
    return new Promise((resolve, reject) => {
        const things = [];
        let lineReader;
        let readStream;
        try {
            readStream = fs.createReadStream(path.resolve(file));
            readStream.on('error', error => reject(error));
            lineReader = readline.createInterface({
                input: readStream
            });
        } catch (error) {
            reject(error);
        }
        lineReader
            .on('line', line => {
                try {
                    line && things.push(toNumberArray(line));
                } catch (error) {
                    reject(error);
                }
            })
            .on('close', () => {
                resolve(things);
            });
    });
}

/**
 * Grab the things to pack and start the chain to send packages to the customers
 * @async
 * @returns {Promise<String>} - The 📦, filled with goodies
 * @throws {TypeError}        - If some of the things provided are weird and cannot be packed by the chain
 * @throws {Error}            - If something went wrong during the processing of the file
 */
async function runPackingChain () {
    let things = [];
    const CHAIN_CAPACITY = program.capacity || DEFAULT_CHAIN_CAPACITY;
    const PACKAGE_SEPARATOR = program.separator || DEFAULT_PACKAGE_SEPARATOR;
    if (program.file) {
        try {
            const fileThings = await processFile(program.file);
            things = [...things, ...fileThings];
        } catch (error) {
            throw error;
        }
    }
    if (program.things) {
        things.push(toNumberArray(program.things));
    }

    const validThings = things.every(thing => isArrayOfNumbers(thing));
    if (!validThings) {
        throw new TypeError('💥 Some of your things cannot be packed and that broke the chain');
    }
    const chain = new PackingChain(CHAIN_CAPACITY, PACKAGE_SEPARATOR);
    chain.pack(...things);
    const delivery = chain.ship();
    return Promise.resolve(delivery);
}

console.log('📦 Packing you things...');
runPackingChain()
    .then(delivery => {
        console.log('🚚 Your packages are now in transit:', delivery);
        process.exit(0);
    }).catch(error => {
        console.error(`💥 The chain broke ! Here is what our teams report:
${error.message}
`);
        process.exit(-1);
    });
