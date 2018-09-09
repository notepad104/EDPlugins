function base(input) {
	return `*Echo*: ${input}`
}

function plugin(ctx) {
	return ctx.replyWithMarkdown(base(ctx.match[2]))
}

function inline(ctx) {
	var output = base(ctx.match[2])
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Eu vou dizer isso!',
			id: 'echo',
			input_message_content: {
				message_text: output,
				parse_mode: 'Markdown'
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	id: 'echo',
	name: 'Echo',
	about: 'Repete o texto (Suportar Markdown).',
	regex: /^\/(repet[eirs]*|echo[s]*)\s(.+)/i,
	example: '/echo *LINDO*',
	classification: ['Entretenimento', 'Ferramentas'],
	plugin,
	inline
}
