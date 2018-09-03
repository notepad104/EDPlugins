const request = require('request-promise-native')

async function base(ctx) {
	var input = ctx.match[1]
	if (input == undefined) {
		input = 'random'
	}
	var data = await request({
		baseUrl: 'http://api.giphy.com',
		uri: '/v1/gifs/search',
		agent: false,
		pool: {
			maxSockets: 100
		},
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
			agent: false,
			pool: {
				maxSockets: 100
			},
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
	return post_select
}

async function plugin(ctx) {
	var post_select = await base(ctx)
	var select = post_select[Math.floor((Math.random() * post_select.length) + 1)]
	return ctx.replyWithDocument(select.images.original_mp4.mp4)
}

async function inline(ctx) {
	var result = []
	var posts = await base(ctx)
	var n = 0
	posts.forEach(select => {
		console.log(select)
		var url = select.images.original_mp4.mp4
		n++
		result.push({
			type: 'gif',
			title: 'GIF',
			id: `gifs${n}`,
			gif_url: url,
			thumb_url: url
		})
	})
	ctx.answerInlineQuery(result, {
		cache_time: 0
	})
}

module.exports = {
	name: 'Gifs',
	about: 'Enviar uma Gif relacionado com o assunto mencionado.',
	regex: /^\/gif[s\s]*(.+)*/i,
	example: '/gif gatinhos',
	classification: ['Entretenimento', 'Pesquisa'],
	plugin,
	inline
}
