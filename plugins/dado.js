function base(ctx) {
	var range = ctx.match[1]
	var dados = ctx.match[2]
	if (dados == undefined) {dados = 1}
	var minrange = 2
	var maxrange = 1000
	var maxdados = 20
	if (range < minrange) {
		return `⚠️ *Atenção:* O número mínimo de lados é \`${minrange}\`.`
	}
	if (range > maxrange) {
		return `⚠️ *Atenção:* O alcance máximo de lados é \`${maxrange}\`.`
	}
	if (dados > maxdados) {
		return `⚠️ *Atenção:* O alcance máximo de dados é \`${maxdados}\`.`
	}
	var output = `*Rodando* \`${dados}\` *${dados == 1 ? 'dado' : 'dados'}, `
	output += `com* \`${range}\` *lados`
	if (dados == 1) {
		output += `\nO Dado parou no número:* 🎲 \``
	} else {
		output += `\nOs Dados param nos números:* 🎲 \``
	}
	for (var i = 0; i < dados; i++) {
		output += Math.floor((Math.random() * range) + 1) + '` '
	}
	if (dados % 2 == 0) {
		output += '`'
	}
	return output
}

function plugin(ctx) {
	return ctx.replyWithMarkdown(base(ctx))
}

function inline(ctx) {
	var output = base(ctx)
	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Resultado do(s) dado(s).',
			id: `dado`,
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
	id: 'dado',
	name: 'Dados',
	about: 'Enviar números aleatórios.',
	regex: [
		/^\/girar (\d*)[d ](\d*)/i,
		/^\/girar (\d)/i,
		/^\/dado[s]* (\d*)[d ](\d*)/i,
		/^\/dado[s]* (\d)/i
	],
	example: ['/dados 9d5', '/girar 5'],
	classification: ['Entretenimento', 'Ferramentas'],
	plugin,
	inline
}
