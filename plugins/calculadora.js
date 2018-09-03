const request = require('request-promise-native')

async function base(input) {
	var data = await request({
		baseUrl: 'http://api.mathjs.org',
		uri: '/v1/',
		qs: {
			expr: input
			//FIX noob in math
			.replace(/x/i, '*')
			.replace(':', '/')
			.replace(' ', '')
		}
	})
	var output = ''
	if (data.match(/error/i)) {
		data = data
		.replace('Invalid left hand side of assignment operator','')
		.replace(/char.*$/i, 'Não é uma expressão matemática.')
		.replace('Error: ', '')
		.replace('Undefined symbol', 'não foi definido nenhum numero para:')
		.replace('Syntax = ','')
		.replace('SyntaxValue expected', '')
		return {
			output: `*Error ao Calcular:* \`${data}\``,
			title: `Error ao Calcular: ${data}`
		}
	} else {
		return {
			output: `*Pelos meus calculos:* \`${input} = ${data.replace('Infinity','Infinito')}\``,
			title: `Resultado: ${data.replace('Infinity','Infinito')}`
		}
	}
}

async function plugin(ctx) {
	//TODO: Add suport reply msg
	var output = await base(ctx.match[1])
	return ctx.replyWithMarkdown(output.output)
}

async function inline(ctx) {
	var info = await base(ctx.match[1])
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: `${info.title}`,
			id: 'calculadora',
			input_message_content: {
				message_text: info.output,
				parse_mode: 'Markdown'
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	name: 'Calculadora',
	about: '', //TODO: Add about
	regex: /^\/calc[uladora]*\s*(.+)/i,
	example: '/calc 7*1+5',
	classification: ['Ferramentas'],
	plugin,
	inline
}
