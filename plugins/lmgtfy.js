function base(input) {
	return `<b>-></b> <a href="http://lmgtfy.com/?q=${encodeURIComponent(input)}">${input}</a>`
}

function plugin(ctx) {
	return ctx.replyWithHTML(base(ctx.match[1]))
}

function inline(ctx) {
	var output = base(ctx.match[1])
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Deixa eu ensinar esse noobs!',
			id: 'lmgtfy',
			input_message_content: {
				message_text: output,
				parse_mode: 'HTML'
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	name: 'Lmgtfy',
	about: 'Guia para noobs que não sabem usar buscadores.',
	regex: /^\/lmgtfy[s]*\s(.+)/i,
	example: '/lmgtfy Como pesquisar no Google',
	classification: ['Entretenimento', 'Ferramentas'],
	plugin,
	inline
}
