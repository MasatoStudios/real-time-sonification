import data from '..Data/VOO.json'

// var VooObject = JSON.parse(data)

// var VooPrice = VooObject.map((obj) => obj.VOO[0].Open)
// console.log(VooPrice)

// var request = require('request')

// var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPX&interval=5min&apikey={process.env.ALPHA_VANTAGE_API_KEY}`

// request.get(
// 	{
// 		url: url,
// 		json: true,
// 		headers: { 'User-Agent': 'request' },
// 	},
// 	(err, res, data) => {
// 		if (err) {
// 			console.log('Error:', err)
// 		} else if (res.statusCode !== 200) {
// 			console.log('Status:', res.statusCode)
// 		} else {
// 			// data is successfully parsed as a JSON object:
// 			console.log(data)
// 		}
// 	}
// )
