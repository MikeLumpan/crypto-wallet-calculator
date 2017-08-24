global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const fs = require('fs');
let wallet = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let currencyMap = JSON.parse(fs.readFileSync('./currency-map.json', 'utf8'));
let symbols = [];
let res = [];
let date = new Date().toISOString().substring(0, 10);
for (let symbol in wallet) {
    symbols.push(symbol);
}
cc.priceMulti(symbols, ['USD'])
.then(prices => {
    for (let symbol in prices) {
        wallet[symbol].position_usd = wallet[symbol].quantity * prices[symbol].USD;
	let asset = {
            date: date,
	    symbol: symbol,
            name: currencyMap[symbol],
            quantity: wallet[symbol].quantity,
            price: prices[symbol].USD,
            position: wallet[symbol].quantity * prices[symbol].USD
	};
	res.push(asset);
    }
    fs.writeFileSync('../data/'+date.replace(/-/g,'')+'.json', JSON.stringify(res));
})
.catch(console.error)
