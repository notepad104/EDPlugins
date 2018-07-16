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

module.exports = {
	name: 'Ping',
	about: 'Retorna um Pong :)',
	regex: /^\/ping/i,
	example: '/ping',
	classification: ['Entretenimento'],
	plugin,
	inline
}
