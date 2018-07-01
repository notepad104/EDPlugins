const request = require('request-promise-native')

async function base() {
	var data = await request({
		baseUrl: 'https://api.bunnies.io',
		uri: '/v2/loop/random/',
		qs: {
			media: 'gif'
		}
	})
	data = JSON.parse(data)
	return data.media.gif
}

async function plugin(ctx) {
	var r = await base()
	return ctx.replyWithDocument(r)
}

async function inline(ctx) {
	var result = []
	var url = await base()
	result.push({
		type: 'gif',
		title: 'Um lindo coelho',
		id: `coelhos`,
		gif_url: url,
		thumb_url: url
	})
	ctx.answerInlineQuery(result, {
		cache_time: 0
	})
}

const regex = /^\/coelho[s]*/i
const about = 'Enviar uma gif de coelho'

module.exports = {
	plugin,
	inline,
	about,
	regex
}
