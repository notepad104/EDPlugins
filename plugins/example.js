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

function callback(ctx) {
	return ctx.answerCbQuery({
		text: ':)'
	})
}

const id = 'example' //No space or special char
const name = 'Plugin de Exemplo'
const about = 'Sobre esse plugin.'
const classification = ['Example']
const regex = /^\/command-regex/i
const example = '/command-regex' //or ['/command-regex', /Command-Regex]

module.exports = {
	id,
	name,
	plugin,
	inline,
	callback,
	about,
	classification,
	regex,
	example
}
