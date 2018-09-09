function showClassifications(ctx) {
	var text = `Temos um total de *${ctx.plugins.length}* plugins ativados.\n`
	text += 'Toque em um botão para ver os *comandos relacionados*'
	var extra =  {
		parse_mode: 'Markdown',
		reply_markup: {
			inline_keyboard:
			[
				[{text: '🕹 Entretenimento', callback_data: 'help:c:Entretenimento'}],
				[{text: '🔍 Pesquisa', callback_data: 'help:c:Pesquisa'}],
				[{text: '🛠 Ferramentas', callback_data: 'help:c:Ferramentas'}]
			]
		}
	}
	if (ctx.updateType == 'callback_query') {
		return ctx.editMessageText(text, extra)
	} else if (ctx.chat.type == 'private') {
		return ctx.replyWithMarkdown(text, extra)
	} else {
		ctx.telegram.sendMessage(ctx.from.id, text, extra)
		.catch(e => {
			ctx.replyWithMarkdown('_Primeiro, Você precisa iniciar uma conversa comigo em uma mensagem privada._', {
				reply_markup: {
					inline_keyboard:
					[[
						{
							text: '🤖 Iniciar conversa.',
							url: 'https://telegram.me/sidbetabot?start=help'
						}
					]]
				}
			})
		})
		.then(e => {
			if (e) {
				ctx.replyWithMarkdown('_Eu enviei a mensagem de ajuda em uma mensagem privada._')
			}
		})
		return
	}
}

function showInfoPlugin(_, n, isAdmin) {
	var output = ''
	if (n != 0) {
		output += `<b>${n}</b> - ${_.name}\n`
	} else {
		output += `<b>${_.name}</b>\n`
	}
	if (isAdmin) {
		output += `<b>Id:</b> <code>${_.id}</code>\n`
	}
	output += `<b>Sobre:</b> ${_.about}\n\n`
	//TODO: Add link of classification
	output += `<b>Categoria(s):</b> ${_.classification.toString().replace(',', ', ')}\n`
	if (_.example) {
		output += `<b>Exemplo de uso:</b> <code>${_.example.toString().replace(',', ', ')}</code>\n`
	}
	output += `<b>Compatilibidade:</b> ${_.plugin? 'Modo de comando, ' : ''}${_.inline? 'Modo Inline' : ''}\n`
	if (isAdmin) {
		output += `<b>Regex:</b> <code>${_.regex.toString().replace(',', ', ')}</code>\n`
	}
	return output
}

function selectPlugins(_, classification) {
	return _.classification.includes(classification)
}

function plugin(ctx) {
	if (ctx.match[1] == 'help' || ctx.match[1] == 'ajuda') {
		return showClassifications(ctx)
	}
	return
}

function callback(ctx) {
	if (ctx.match[2] == 'main') {
		return showClassifications(ctx)
	}
	else if (ctx.match[2] == 'c' && ctx.match[3]) {
		var text = '<b>Escolha um plugin!</b>'
		var plugins = []
		//TODO: Resumo simples de todos
		for (var _ of ctx.plugins) {
			if (selectPlugins(_, ctx.match[3])) {
				if (ctx.match[4] && _.id == ctx.match[4]) {
					text = showInfoPlugin(_, 0, true)
					plugins.push([{text: `🔸 ${_.name}`, callback_data: `help:c:${ctx.match[3]}:${_.id}`}])
				} else {
					plugins.push([{text: `🔹 ${_.name}`, callback_data: `help:c:${ctx.match[3]}:${_.id}`}])
				}
			}
		}

		//FIXME: Gambiarra .-.
		var pairCheck = false
		var keyboard = plugins.sort().reduce((_, next) => {
			if (Array.isArray(_)) {
				if (Array.isArray(_[0])) {
					if (pairCheck) {
						_.push([].concat(pairCheck, next))
						pairCheck = false
						return _
					} else {
						pairCheck = next
						return _
					}
				} else {
					return [
						[].concat(_, next)
					]
				}
			}
		})
		if (pairCheck) {
			keyboard.push(pairCheck)
		}
		//END: Gambiarra
		keyboard.push([{text: '🔙 Volta', callback_data: 'help:main'}])
		return ctx.editMessageText(text, {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: keyboard
			}
		})
	}
	return
}

function inline(ctx) {
	return
}

module.exports = {
	id: 'help',
	name: 'Ajuda',
	about: 'Motrar informações de plugins e como usar.',
	regex: [
		/^\/ajuda[s]*\s(.+)/i,
		/^\/help\s(.+)/i,
		/^\/(ajuda)[s]*/i,
		/^\/(help)/i,
	],
	example: '/ajuda',
	classification: ['Ferramentas'],
	plugin,
	inline,
	callback
}
