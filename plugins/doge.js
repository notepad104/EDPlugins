function base(input) {
	return `http://dogr.io/${encodeURIComponent(input)}.png?split=false&.png`
}

function plugin(ctx) {
	var url = base(ctx.match[1])
	return ctx.replyWithPhoto(url)
}

function inline(ctx) {
	var url = base(ctx.match[1])
	ctx.answerInlineQuery([{
		type: 'photo',
		title: 'Doge',
		id: 'doge',
		photo_url: url,
		thumb_url: url
	}], {
		cache_time: 0
	})
}

module.exports = {
	id: 'doge',
	name: 'Doge',
	about: 'Enviar uma foto com o famoso Doge junto com seu texto.',
	regex: /^\/doge (.*)/i,
	example: '/doge Love ED',
	classification: ['Entretenimento'],
	plugin,
	inline
}
