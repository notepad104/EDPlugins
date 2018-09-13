var googleSearch = require('../private/google-synko/') //Private License .-. Sorry

async function base(input) {
	var google = await googleSearch(input)
	if (google.length == 0) {
		return [{
			title: 'Não encontrei nada!',
			output: '<code>Sem resultados!</code>'
		}]
	}
	var results = []
	google.forEach(r => {
		results.push({
			title: r.title,
			output: `<b>-></b> <a href="${r.link}">${r.title}</a>\n`
		})
	})
	return results
}

async function plugin(ctx) {
	var input = ctx.match[2]
	var output = `👁‍🗨 <b>Resultados para:</b> <code>${input}</code>\n`
	var results = await base(input)
	var limit = 4
	if (ctx.chat.type == 'private') {
		limit = 8
	}
	var foundN = 0
	for (res of results) {
		if (foundN < limit) {
			foundN += ''
			output += res.output
		}
	}
	return ctx.replyWithHTML(output)
}

async function inline(ctx) {
	var google = await base(ctx.match[2])
	var results = []
	var n = 0
	for (result of google) {
		n++
		results.push({
			type: 'article',
			title: `${result.title}`,
			id: `google${n}`,
			input_message_content: {
				message_text: result.output,
				parse_mode: 'HTML'
			}
		})
	}
	ctx.answerInlineQuery(results, {
		cache_time: 0
	})
}

module.exports = {
	id: 'google'
	name: 'Google',
	about: 'Busca de sites no Google.',
	regex: /^\/(g[o]*gle|pesquisa[sr]*)\s(.+)/i,
	example: '/google RobôED',
	classification: ['Pesquisa'],
	plugin,
	inline
}
