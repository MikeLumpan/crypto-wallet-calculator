/* Author: Brett McLain
 * Looks at historical 
 * Description: Used to compare the value of N (1 or more) crypto currencies 
 *              between two dates.
 * Usage: node historical.js wallet.json 2017-01-01 2017-08-20
 */
global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const fs = require('fs');
let wallet = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let currencyMap = JSON.parse(fs.readFileSync('./currency-map.json', 'utf8'));
let res = [];
for (let symbol in wallet) {
    res.push({ symbol: symbol, name: currencyMap[symbol] });
}
for (let i = 0; i < res.length; i++) {
    cc.priceHistorical(res[i].symbol, ['USD'], new Date(process.argv[3]))
    .then(prices => {
        res[i].initial = prices.USD;
        cc.priceHistorical(res[i].symbol, ['USD'], new Date(process.argv[4]))
        .then(prices => {
            res[i].final = prices.USD;
            res[i].totalGain = (100 / res[i].initial) * prices.USD; 
            res[i].percentGain = (res[i].totalGain / res[i].initial);
            console.log(JSON.stringify(res));
        })
        .catch(console.error);
    })
    .catch(console.error);
}
