const request = require('request-promise-native')

async function plugin(ctx) {
	var data = await request({
		baseUrl: 'https://api.bunnies.io',
		uri: '/v2/loop/random/',
		qs: {
			media: 'gif'
		}
	})
	data = JSON.parse(data)
	return ctx.replyWithDocument(data.media.gif)
}

const regex = /^\/coelho[s]*/i
const about = 'Enviar uma gif de coelho'

module.exports = {
	plugin,
	about,
	regex
}
