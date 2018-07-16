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

const name = 'Plugin de Exemplo'
const about = 'Sobre esse plugin.'
const classification = ['Example']
const regex = /^\/command-regex/i
const example = '/command-regex' //or ['/command-regex', /Command-Regex]

module.exports = {
	name,
	plugin,
	inline,
	about,
	classification,
	regex,
	example
}
