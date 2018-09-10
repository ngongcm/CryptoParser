# CryptoParser
Package for easily parsing and using data from CoinMarketCap's new PRO API<br><br>
Usage:
```
   const rp = require('request-promise');
   const crypto = require('./CryptoParser.js');
   const uri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
   const qs = {
	  limit: 25
   };
   const pk = 'YOUR PRIVATE KEY';
   var cryptoparser = new crypto('GET',uri, qs, pk, true, true);
   cryptoparser.MakeCall(cryptoparser.parse_Latest_Call, rp).then(val => {
	    for(let coin of val) {
		      console.log(`${coin.name} \'s price is: ${coin.price}`);
	    }
    });
