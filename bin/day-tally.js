global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const fs = require('fs');
let wallet = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let currencyMap = JSON.parse(fs.readFileSync('./currency-map.json', 'utf8'));
let totalValue = 0;
for (var symbol in wallet) {
    totalValue += wallet[symbol].position;
}
console.log(totalValue + " USD");