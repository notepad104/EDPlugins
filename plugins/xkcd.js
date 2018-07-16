const request = require('request-promise-native')

async function base(ctx) {
	var id = ctx.match[2]
	if (id == undefined) {
		id = Math.floor((Math.random() * 1999) + 1)
	}
	var data = await request({
		baseUrl: 'http://xkcd.com/',
		uri: `${id}/info.0.json`
	})
	data = JSON.parse(data)
	return data
}

async function plugin(ctx) {
	var data = await data(ctx)
	var output = `🌐 <b>${data.title}</b> (${data.num})\n📮 ${data.alt}\n<a href="${data.img}">‌</a>`
	return ctx.replyWithHTML(output)
}

async function inline(ctx) {
	var data = await base(ctx)
	var output = `🌐 <b>${data.title}</b> (${data.num})\n📮 ${data.alt}\n<a href="${data.img}">‌</a>`
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: data.title,
			id: `xkcd${data.num}`,
			input_message_content: {
				message_text: output,
				parse_mode: 'HTML'
			}
		}
	], {
		cache_time: 0
	})
}

const regex = /^\/xkcd([ ](\d*))*/i
const about = 'Enviar uma imagem do xkcd.'

module.exports = {
	name: 'XKCD',
	about: 'Enviar uma imagem do xkcd.',
	regex: /^\/xkcd([ ](\d*))*/i,
	example: ['/xkcd', '/xkcd 123'],
	classification: ['Entretenimento', 'Pesquisa'],
	plugin,
	inline
}
