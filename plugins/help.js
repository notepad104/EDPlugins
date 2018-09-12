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
	if (ctx.isAdmin(ctx)) {
		extra.reply_markup.inline_keyboard.push([{
			text: '💎 Admin/Bot', callback_data: 'help:c:Bot'
		}])
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
							url: `https://telegram.me/${ctx.options.username}?start=help`
						}
					]]
				},
				disable_web_page_preview: true
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

function showInfoPlugin(ctx, _, n, isAdmin) {
	var output = ''
	if (n != 0) {
		output += `<b>${n}</b> - ${_.name}\n`
	} else {
		output += `<b>${_.name}</b>\n`
	}
	if (isAdmin) {
		output += `<b>Id:</b> <code>${_.id}</code>\n`
	}
	output += `<b>Sobre:</b> ${_.about}\n`
	if (_.example) {
		output += `<b>Exemplo de uso:</b> ${_.example.toString().replace(/,/g, ', ')}\n`
	}
	output += '\n'
	var classifications = []
	for (classification of _.classification.sort()) {
		classifications.push(`<a href="https://telegram.me/${ctx.options.username}?start=help-c_${classification}">${classification}</a>`)
	}
	output += `<b>Categoria(s):</b> ${classifications.toString().replace(/,/g, ', ')}\n`
	output += `<b>Compatilibidade:</b> ${_.plugin? 'Modo de comando, ' : ''}${_.inline? 'Modo Inline' : ''}\n`
	if (isAdmin) {
		output += `<b>Regex:</b> <code>${_.regex.toString().replace(/,/g, ',\n')}</code>\n`
	}
	return output
}

function showPlugins(ctx) {
	var text = '<b>Escolha um plugin!</b>'
	var plugins = []
	var classification = ''
	if (ctx.updateType == 'message') {
		classification = ctx.match[1].replace('c_', '')
	} else {
		classification = ctx.match[3]
	}
	//TODO: Resumo simples de todos
	for (var _ of ctx.plugins) {
		if (selectPlugins(_, classification)) {
			if (ctx.match[4] && _.id == ctx.match[4]) {
				text = showInfoPlugin(ctx, _, 0, ctx.isAdmin(ctx))
				plugins.push([{text: `🔸 ${_.name}`, callback_data: `callback:same`}])
			} else {
				plugins.push([{text: `🔹 ${_.name}`, callback_data: `help:c:${classification}:${_.id}`}])
			}
		}
	}

	//FIXME: Gambiarra .-.
	var keyboard = []
	if (3 < plugins.length) {
		var pairCheck = false
		keyboard = plugins.sort().reduce((_, next) => {
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
	} else {
		keyboard = plugins
	}
	//END: Gambiarra
	keyboard.push([{text: '🔙 Volta', callback_data: 'help:main'}])
	if (ctx.updateType == 'message' && ctx.chat.type == 'private') {
		return ctx.replyWithHTML(text, {
			reply_markup: {
				inline_keyboard: keyboard
			},
			disable_web_page_preview: true
		})
	} else {
		return ctx.editMessageText(text, {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: keyboard
			},
			disable_web_page_preview: true
		})
	}
}

function selectPlugins(_, classification) {
	return _.classification.includes(classification)
}

function plugin(ctx) {
	var match = ctx.match[1]
	if (match == 'help' || match == 'ajuda') {
		return showClassifications(ctx)
	} else if ([
		'c_Entretenimento',
		'c_Pesquisa',
		'c_Ferramentas',
		'c_Bot'
	].includes(match)) {
		return showPlugins(ctx)
	}
	return
}

function callback(ctx) {
	if (ctx.match[2] == 'main') {
		return showClassifications(ctx)
	}
	else if (ctx.match[2] == 'c' && ctx.match[3]) {
		return showPlugins(ctx)
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
	callback
}
