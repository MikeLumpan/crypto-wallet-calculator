# CryptoWalletCalc

This script reads from a JSON file that must contain crypto currency symbols (BTC, ETH, LTC, etc.) and their corresponding quantities. The output will be the date, symbol, quantity, price per unit (USD), and position (quantity * price per unit) in USD.

###Folder Structure:

*/bin contains the node script for pulling prices.
*/data contains data already pulled.
*/html contains html files that generate visualizations based on the json output from /bin/calculate.js

###Example input JSON:

    {
        "BTC": {
            "quantity": 10,
        }
    }

###Example output JSON:

    {
        "date":"2017-08-23",
        "symbol":"BTC",
        "name":"Bitcoin",
        "quantity":0.00248323,
        "price":4182.83,
        "position":10.386928940899999
    }
