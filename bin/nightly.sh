#!/bin/bash

cd /home/ubuntu/crypto-wallet-calculator/bin
node calculate.js wallet.json
node balance-line.js 2017-08-20
node currency-lines.js 2017-08-20
