# XspeedIt

Node cli to pack things inside 📦 trying to use the minimum amount of 📦.

# Usage

Before everything `npm i`.

Then to see all the available options run `npm run pack -- -h`

Then you have several choices:

- Read input from a file, with the `--file` switch
- Read input directly from the CLI with the `--things` switch
- Use both

You can specify capacity of packages with the `--capacity` swicth and the package  separator with the `--separator` switch.

If you wish to run the tests simply `npm run test` to kick off jest.

If you wish to have all the specs replayed when a file is modified run `npm run test:integration`.

To run the [goals](https://github.com/nico29/xspeedit/blob/master/GOALS.md) case run `npm run pack -- -f tests/things.txt`.

# Documentation

JSDOC can be found [here](https://nico29.github.io/xspeedit/).

The initial goals of this project can be found [here](https://github.com/nico29/xspeedit/blob/master/GOALS.md)

![](https://media.giphy.com/media/lM86pZcDxfx5e/giphy.gif)
