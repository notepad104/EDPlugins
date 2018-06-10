const request = require('request-promise-native')
async function plugin(ctx) {
	var input = ctx.match[1]
	if (input == undefined) {
		input = 'random'
	}
	var data = await request({
		baseUrl: 'http://api.giphy.com',
		uri: '/v1/gifs/search',
		qs: {
			api_key: process.env.giphy_token,
			q: ctx.match[1]
		}
	})

	post_select = []
	data = JSON.parse(data)
	if (data.pagination.count == 0) {
		var data = await request({
			baseUrl: 'http://api.giphy.com',
			uri: '/v1/gifs/search',
			qs: {
				api_key: process.env.giphy_token,
				q: '404'
			}
		})
		data = JSON.parse(data)
	}

	posts = data.data
	posts.forEach(post => {
		if (post.type == 'gif') {
			post_select.push(post)
		}
	})
	var select = post_select[Math.floor((Math.random() * post_select.length) + 1)]
	return ctx.replyWithDocument(select.images.original_mp4.mp4)
}

const regex = /^\/gif[s\s]*(.+)*/i
const about = 'Enviar um Gif relacionado com o assunto mencionado.'

module.exports = {
	plugin,
	about,
	regex
}
