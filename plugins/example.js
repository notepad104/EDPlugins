function base() {
	return ':)'
}

function plugin(ctx) {
	return ctx.reply(base())
}

function inline(ctx) {
	var output = base()
	return ctx.answerInlineQuery([
		{
			type: 'article',
			title: output,
			id: 'smile',
			input_message_content: {
				message_text: output
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
