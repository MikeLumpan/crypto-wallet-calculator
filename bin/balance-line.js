/* Author:      Brett McLain
 * Description: Used to traverse each day's JSON file and calculate the balance of each day. 
 * Usage:       node balance-line.js 2017-08-20 
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
        let filepath = '../data/raw/' + epochDate.toISOString().substring(0, 10).replace(/-/g, '')+'.json';
        positions = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (err) {
        break;
    }
    let totalValue = 0;
    for (var symbol in positions) {
        totalValue += parseFloat(positions[symbol].position);
    }
    data.push({
        date: epochDate.toISOString().substring(0, 10),
        balance: totalValue
    }); 
    counter++;
}
fs.writeFileSync('../data/balances/'+(new Date().toISOString().substring(0, 10).replace(/-/g,''))+'-balance.json', JSON.stringify(data));
