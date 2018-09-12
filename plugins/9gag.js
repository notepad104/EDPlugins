var lgag = require('9gag')

async function base() {
	var Scraper = lgag.Scraper
	var scraper = new Scraper(10, 'hot', 1)
	var posts = await scraper.scrap()
	var post_select = []
	posts.forEach(post => {
		if (post.nsfw == 0 && post.type == 'Image') {
			/*
			post.url
			post.content
			post.upVoteCount
			post.commentsCount
			post.title
			*/
			post_select.push(post)
		}
	})
	return post_select
}

async function plugin(ctx) {
	var post_select = await base()
	var select = post_select[Math.floor((Math.random() * post_select.length) + 1)]
	var output = `9⃣ <b>${select.title}</b>\n💬 ${select.commentsCount} 👍 ${select.upVoteCount}\n${select.url}`
	return ctx.replyWithHTML(output)
}

async function inline(ctx) {
	var result = []
	var posts = await base()
	var n = 0
	for (select of posts) {
		var output = `9⃣ <b>${select.title}</b>\n💬 ${select.commentsCount} 👍 ${select.upVoteCount}\n${select.url}`
		n++
		result.push({
			type: 'article',
			title: select.title,
			id: `9gag${n}`,
			input_message_content: {
				message_text: output,
				parse_mode: 'HTML'
			}
		})
	}
	ctx.answerInlineQuery(result, {
		cache_time: 0
	})
}

module.exports = {
	id: '9gag',
	name: '9GAG',
	about: 'Enviar imagens aleatórias do site 9GAG.com.',
	regex: /^\/[9]*gag/i,
	example: '/9gag',
	classification: ['Entretenimento'],
	plugin,
	inline
}
