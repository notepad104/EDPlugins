var axios = require('axios')

async function sendRequest(input) {
	var response = await axios({
		method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/search',
		params: {
			api_key: process.env.giphy_token,
			q: input
		}
	})
	var data = response.data
	return data
}

async function base(ctx) {
	var input = ctx.match[1]
	if (input == undefined) {
		input = 'random'
	}

	var data = await sendRequest(input)

	var post_select = []
	if (data.pagination.count == 0) {
		data = await sendRequest('404')
	}

	var posts = data.data
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
	for (var select of posts) {
		var url = select.images.original_mp4.mp4
		n++
		result.push({
			type: 'gif',
			title: 'GIF',
			id: `gifs${n}`,
			gif_url: url,
			thumb_url: url
		})
	}
	ctx.answerInlineQuery(result, {
		cache_time: 0
	})
}

module.exports = {
	id: 'gifs',
	name: 'Gifs',
	about: 'Enviar uma Gif relacionado com o assunto mencionado.',
	regex: /^\/gif[s\s]*(.+)/i,
	example: '/gif gatinhos',
	classification: ['Entretenimento', 'Pesquisa'],
	plugin,
	inline
}
