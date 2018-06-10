const request = require('request-promise-native')

async function plugin(ctx) {
	var id = ctx.match[2]
	if (id == undefined) {
		id = Math.floor((Math.random() * 1999) + 1)
	}
	var data = await request({
		baseUrl: 'http://xkcd.com/',
		uri: `${id}/info.0.json`
	})
	data = JSON.parse(data)
	var output = `🌐 <b>${data.title}</b> (${data.num})\n📮 ${data.alt}\n<a href="${data.img}">‌</a>`
	return ctx.replyWithHTML(output)
}

const regex = /^\/xkcd([ ](\d*))*/i
const about = 'Enviar uma imagem do xkcd.'

module.exports = {
	plugin,
	about,
	regex
}
