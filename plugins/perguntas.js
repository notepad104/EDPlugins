function base (input) {
	var respostas = [
		'Sim.',
		'Não.',
		'É certo.',
		'É decididamente assim.',
		'Sem dúvida.',
		'Sim definitivamente.',
		'Talvez, sim.',
		'Provavelmente.',
		'Há perspectiva, é boa.',
		'Os sinais apontam para sim.',
		'Não conte com isso.',
		'Minha resposta é sim.',
		'Minha resposta é não.',
		'Minhas fontes dizem que sim.',
		'Minhas fontes dizem que não.',
		'Há perspectiva, não é tão boa.',
		'Muito dizem que sim.',
		'Muito dizem que não.',
		'Absolutamente.',
		'Só nos seus sonhos.',
		'Há um tempo e lugar para tudo, mas não agora.'
	]
	var gg = [
		'Pergunte novamente mais tarde.',
		'Melhor não dizer agora.',
		'Não é possível prever agora.',
		'Concentre-se e perguntar de novo.'
	]
	if (input.length < 32) {
		return respostas[Math.floor((Math.random() * respostas.length))]
	} else {
		return gg[Math.floor((Math.random() * gg.length))]
	}
}

function plugin(ctx) {
	return ctx.reply(base(ctx.match[1]))
}

function inline(ctx) {
	var input = ctx.match[1]
	var output = `Eu: ${input}\nEd: ${base(input)}`

	ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Resultado da resposta.',
			id: `perguntas`,
			input_message_content: {
				message_text: output,
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	id: 'perguntas',
	name: 'Perguntas',
	about: 'Faça uma pergunta simples ao bot, para obter sua resposta.',
	regex: /^\/pergunta[rs\s]*(.+)/i,
	example: '/perguntas é verdade que uma verdade é verdadeira?',
	classification: ['Entretenimento', 'Ferramentas'],
	plugin,
	inline
}
