function plugin(ctx) {
	return ctx.reply('Pong 🎾')
}

function inline(ctx) {
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Pong!',
			id: 'ping',
			input_message_content: {
				message_text: 'Pong 🎾'
			}
		}
	], {
		cache_time: 120
	})
}

const about = 'Retorna um Pong :)'
const regex = /^\/ping/i

module.exports = {
	plugin,
	inline,
	about,
	regex
}
