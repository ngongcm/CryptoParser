class Coin {
	constructor(id, name, symbol) {
		this.id = id;
		this.name = name;
		this.symbol = symbol;
	}
};


//CoinMarketCap ID map
class Coin_ID_MAP extends Coin {
	constructor(id, name, symbol, first, last) {
		super(id, name, symbol);
		this.first = first;
		this.last = last;
	}
}

//CoinMarketCap Metadata
class Coin_Metadata extends Coin {
	constructor(id, name, symbol, category, logo, website, source_code, SocialMediaUrls) {
		super(id,name,symbol);
		this.category = category;
		this.logo = logo;
		this.website = website;
		this.source_code = source_code;
		this.SocialMediaUrls = SocialMediaUrls;
	}
}

//CoinMarketCap - List All CryptoCurrencies (latest)
class Coins_Latest extends Coin {
	constructor(id, name, symbol, rank, circ_supply, tot_supply, max_supply, date_added, price, vol_24, change_1, change_24, change_7d, marketcap) {
		super(id,name,symbol);
		this.rank = rank;
		this.circ_supply = circ_supply;
		this.tot_supply = tot_supply;
		this.max_supply = max_supply;
		this.date_added = date_added;
		this.price = price;
		this.vol_24 = vol_24;
		this.change_1 = change_1;
		this.change_24 = change_24;
		this.change_7d = change_7d;
		this.marketcap = marketcap;
	}
}


module.exports = {Coin: Coin, Coin_ID_MAP: Coin_ID_MAP, Coin_Metadata: Coin_Metadata, Coins_Latest: Coins_Latest};







