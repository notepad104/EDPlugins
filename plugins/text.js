function inline(ctx) {
	var input = ctx.match[1]
	var results = []
	results.push({
		type: 'article',
		title: 'Markdown Estilo',
		id: 'textMarkdown',
		input_message_content: {
			message_text: `*Texto estilo: Markdown*</b>\n${input}`,
			parse_mode: 'Markdown'
		}
	})
	results.push({
		type: 'article',
		title: 'HTML Estilo',
		id: 'textHTML',
		input_message_content: {
			message_text: `<b>Texto estilo: HTML</b>\n${input}`,
			parse_mode: 'HTML'
		}
	})
	results.push({
		type: 'article',
		title: 'Bloco de Código',
		id: 'textCode',
		input_message_content: {
			message_text: `<b>Texto estilo: Bloco de Código</b>\n<code>${input}</code>`,
			parse_mode: 'HTML'
		}
	})
	//TODO: Add texto tachado
	ctx.answerInlineQuery(results, {
		cache_time: 0
	})
}

module.exports = {
	name: 'Texto Formate',
	about: 'Diversos estilos de formatação de textos.',
	regex: /^\/text[os]*\s(.+)/i,
	example: '/texto *LINDO*',
	classification: ['Ferramentas'],
	inline
}
