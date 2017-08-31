/* Author: Brett McLain
 * Description: Used to join multiple days worth of data and consolidate them in an array.
 *
 */
global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const fs = require('fs');
let data = [];
let epochDate = new Date(process.argv[2] + ' 12:00');
let counter = 0;
while (1) {
    epochDate.setDate(epochDate.getDate() + 1);
    let positions;
    try {
        let filepath = '../data/' + epochDate.toISOString().substring(0, 10).replace(/-/g, '')+'.json';
        positions = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (err) {
        break;
    }
    for (var i = 0; i < positions.length; i++) {
        data.push({
            date: epochDate.toISOString().substring(0,10),
            symbol: positions[i].symbol,
            price: positions[i].position
        });
    }
    counter++;
}
console.log(JSON.stringify(data));
