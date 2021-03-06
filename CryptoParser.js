const Coins = require('./Coin.js');

class CryptoParser {
	constructor(method, uri, qs, pk, json, gzip) {
		this.req_ops = {
			method: method,
			uri: uri,
			qs: qs,
			headers: {
				'X-CMC_PRO_API_KEY': pk
			},
			json: json,
			gzip: gzip
		}
	}

	async MakeCall(method, requestPromise) {
		return requestPromise(this.req_ops).then(res => {
			const data = JSON.stringify(res, null, 2);
			return method(data);
		}).catch((err) => {
			return err.message;
		});
	}

	parse_Map_Call(data) {
		var parsedData = JSON.parse(data);
		var cryptoData = parsedData.data;
		const CoinArr = [];
		for(let obj of cryptoData) {
			var coin = new Coins.Coin_ID_MAP(obj.id, obj.name, obj.symbol, obj.first_historical_data, obj.last_historical_data);
			CoinArr.push(coin);
		}
		return CoinArr;
	}
	parse_Metadata_call(data) {
		var parsedData = JSON.parse(data);
		var cryptoData = parsedData.data;
		const CoinArr = [];
		for(let obj in cryptoData) {
			var socialMedia = [];
			socialMedia.push(cryptoData[obj].urls.reddit[0] || null);
			socialMedia.push(cryptoData[obj].urls.twitter[0] || null);
			var coin = new Coins.Coin_Metadata(cryptoData[obj].id, cryptoData[obj].name, cryptoData[obj].symbol, cryptoData[obj].category, cryptoData[obj].logo, cryptoData[obj].urls.website[0], cryptoData[obj].urls.source_code[0], socialMedia);
			CoinArr.push(coin);
		}
		return CoinArr;
	}

	parse_Latest_Call(data) {
		var parsedData = JSON.parse(data);
		var cryptoData = parsedData.data;
		const CoinArr = [];
		for(let obj of cryptoData) {

			//Allows calling multiple quotes for different currencies
			const price = [], vol24 = [], change1 = [], change24 = [], change7 = [], marketcap = [];

			for(let q in obj.quote) {
				price.push(obj.quote[q].price);
				vol24.push(obj.quote[q].volume_24h);
				change1.push(obj.quote[q].percent_change_1h);
				change24.push(obj.quote[q].percent_change_24h);
				change7.push(obj.quote[q].percent_change_7d);
				marketcap.push(obj.quote[q].market_cap);
			}

			var coin = new Coins.Coins_Latest(
				obj.id, 
				obj.name, 
				obj.symbol, 
				obj.cmc_rank, 
				obj.circulating_supply, 
				obj.total_supply,
				obj.max_supply,
				obj.date_added,
				price,
				vol24,
				change1,
				change24,
				change7,
				marketcap);
			CoinArr.push(coin);
		}
		return CoinArr;
	}
}

module.exports = CryptoParser;


