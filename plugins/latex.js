function plugin(ctx) {
	var input = ctx.match[2]
	if (input == undefined) {
		return ctx.reply('Coloca um texto!')
	}
	var text = encodeURIComponent(input)
	var baseUrl = 'http://latex.codecogs.com'
	var uri = `/png.download?\\dpi{400}%20\\LARGE%20${text}`
	return ctx.replyWithSticker({
		url: `${baseUrl}${uri}`,
		filename: 'sticker.webp'
	})
}

const regex = /^\/(latex\s|sticker[s]*\s)(.*)*/i
const about = 'Enviar um sticker de acordo com o texto mencionado (Esse comando suporta o formato Latex).'

module.exports = {
	plugin,
	about,
	regex
}
