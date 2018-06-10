function plugin(ctx) {
	return ctx.reply('Pong 🎾')
}

const about = 'Retorna um Pong :)'
const regex = /^\/ping/i

module.exports = {
	plugin,
	about,
	regex
}
