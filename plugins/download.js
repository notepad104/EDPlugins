function plugin(ctx) {
	ctx.replyWithDocument(`${ctx.match[1]}`, {
		caption: `URL de origem do download: ${ctx.match[1]}`,
	}).catch(ctx.reply('❌ Erro: URL ou arquivo inválido!'))
	return
}

function inline(ctx) {
	ctx.answerInlineQuery([
		{
			type: 'document',
			title: 'Download!',
			id: 'download',
			caption: `URL de origem do download:${ctx.match[1]}`,
			document_url: `${ctx.match[1]}`
		}
	], {
		cache_time: 0
	}).catch(ctx.answerInlineQuery([
		{
			type: 'article',
			title: '❌ Erro: URL ou arquivo inválido!',
			id: 'download:falid',
			input_message_content: {
				message_text: '❌ Erro: URL ou arquivo inválido!',
				parse_mode: 'Markdown'
			}
		}
	], {
		cache_time: 0
	}))
	return
}

module.exports = {
	id: 'download',
	name: 'Download',
	about: 'Faz donwload de um arquivo, no formato de .ZIP ou .PDF com menos de 50MB.',
	regex: /^\/download\s(.*)/i,
	example: '/download http://synko.com.br/pdf.pdf',
	classification: ['Ferramentas'],
	plugin,
	inline
}
