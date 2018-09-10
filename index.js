const rp = require('request-promise');
const fs = require('fs');
const crypto = require('./CryptoParser.js');

const uri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const qs = {
	limit: 25
};
const pk = '96002ee3-d4f5-4be7-88c6-5567d8509527';
var cryptoparser = new crypto('GET',uri, qs, pk, true, true);
cryptoparser.MakeCall(cryptoparser.parse_Latest_Call, rp).then(val => {
	for(let coin of val) {
		console.log(`${coin.name} \'s price is: ${coin.price}`);
	}
});

// fs.readFile('test_data.json', (err, data) => {
// 	if(err) throw err;
// 	parser(data, 'USD');
// });
