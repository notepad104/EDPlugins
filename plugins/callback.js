function callback(ctx) {
	if (ctx.match[2] == 'same') {
		return ctx.answerCbQuery(
		'Você já selecionou esta opção ‼️',
			true
		)
	}
	return
}

module.exports = {
	id: 'callback',
	name: 'Suporte ao callback',
	about: 'Ajuda em funções de outros plugins',
	regex: [],
	example: '',
	classification: ['Bot'],
	callback
}
