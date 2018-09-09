function base(input) {
	var table = input
	.replace(/,$/g, '')
	.replace(/,\s/g, ',')
	.split(',')
	var select = table[Math.floor((Math.random() * table.length))]
	return `Nome soteado foi: <code>${select}</code>`
}

function plugin(ctx) {
	return ctx.replyWithHTML(base(ctx.match[1]))
}

function inline(ctx) {
	var input = ctx.match[1]
	var output = `Nomes para soteio: <code>${input}</code>\n${base(input)}`
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Resultado do nome soteado.',
			id: 'soteio',
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
	id: 'soteioname',
	name: 'Soteio de Nome',
	about: 'Soteia um nome de uma lista de nomes.',
	regex: /^\/soteio[s]*\s(.+)/i,
	example: '/soteio Tiago, Yan, Wesley',
	classification: ['Entretenimento', 'Ferramentas'],
	plugin,
	inline
}
