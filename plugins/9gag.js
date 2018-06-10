const lgag = require('9gag')

async function plugin(ctx) {
	var Scraper = lgag.Scraper;
	var scraper = new Scraper(10, 'hot', 1);
	const posts = await scraper.scrap();
	post_select = []
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
	var select = post_select[Math.floor((Math.random() * post_select.length) + 1)]
	var output = `<b>${select.title}</b>\n💬 ${select.commentsCount} 👍 ${select.upVoteCount}\n${select.url}`
	return ctx.replyWithHTML(output)
}

const about = 'Enviar imagens aleatórias do site 9GAG.com.'
const regex = /^\/[9]*gag/i

module.exports = {
	plugin,
	about,
	regex
}
