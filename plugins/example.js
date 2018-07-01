function plugin(ctx) {
	return ctx.reply(':)')
}

function inline(ctx) {
	return ctx.answerInlineQuery([
		{
			type: 'article',
			title: ':)',
			id: 'smile',
			input_message_content: {
				message_text: ':)'
			}
		}
	], {
		cache_time: 120
	})
}

const about = 'Sobre esse plugin'
const regex = /^\/command-regex/i

module.exports = {
	plugin,
	inline,
	about,
	regex
}
