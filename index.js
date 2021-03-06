const Telegraf = require('telegraf')
const telegrafStart = require('telegraf-start-parts')
const debug = require('debug')
const stringify = require('json-stringify-safe')

var webhookReply = process.env.webhook_reply == 'true' ? true : false
const isWebhook = process.env.webhook == 'true' ? true : false
const runMode = process.env.run_mode
const admins = process.env.admins
const username = process.env.username

const telegrafOption = {
	telegram: {
		webhookReply: webhookReply
	},
	username: username
}
const bot = new Telegraf(process.env.telegram_token, telegrafOption)

if (!isWebhook) {
	webhookReply = false
}
if (runMode == 'dev') {
	bot.telegram.deleteWebhook()
}
if (isWebhook && runMode != 'test') {
	bot.telegram.setWebhook(process.env.host, {})
}

const dlogBot = debug("bot")
const dlogPlugins = debug("bot:plugins")
const dlogInline = debug("bot:inline")
const dlogCallback = debug("bot:callback")
const dlogError = debug("bot:error")

dlogBot("Start bot")
var startLog = `
#Start
*BOT INICIADO*
*Username:* @${username}
*Modo de recebimento*: ${isWebhook ? 'webhook' : 'polling'}
*Mode de retorno*: ${webhookReply ? 'Resposta ao webhook': 'normal'}
`
if (runMode == 'test' && process.env.TRAVIS_JOB_NUMBER) {
	startLog += `\n[Travis CI Job: #${process.env.TRAVIS_JOB_NUMBER}](https://travis-ci.org/SynkoDevelopers/EDPlugins/jobs/${process.env.TRAVIS_JOB_ID})`
}
bot.telegram.sendMessage(process.env.log_chat,
	startLog, {
		parse_mode: 'Markdown'
	}
)

var plugins = [
	'9gag',
	'calculadora',
	'callback',
	'coelho',
	'commits',
	'dado',
	'doge',
	'download',
	'echo',
	'example',
	'gif',
	'github',
	'help',
	'ip',
	'latex',
	'lmgtfy',
	'perguntas',
	'ping',
	'soteio',
	'text',
	//'torrent', //TODO: API OFF
	'xkcd'
]

if (runMode == 'stable') {
	plugins.push('google')
}

function processError(error, ctx, plugin) {
	var fulllog = []
	var logId = `${+ new Date()}_`
	if (ctx && ctx.update && ctx.update.update_id) {
		logId += `${ctx.update.update_id}`
	} else {
		logId += 'NoUpdate'
	}

	var errorMsg = `
*Ocorreu um erro* ao executar este comando.
Se o problema persistir contante a equipe de suporte via \`/suporte sua mensagem.\`
Entre no Canal @RoboED para ficar por dentro das atualizações do nosso querido Robô de Mimetal.
\`ID:${logId}\`
`
	if (ctx && ctx.updateType) {
		if (ctx.updateType == 'message') {
			ctx.replyWithMarkdown(errorMsg)
		} else if (ctx.updateType == 'callback_query' || ctx.updateType == 'edited_message') {
			ctx.editMessageText(errorMsg, {
				parse_mode: 'Markdown'
			})
		} else if (ctx.updateType == '') {
			ctx.answerCbQuery(
				errorMsg.replace(/\*/g, '').replace(/`/g, ''),
				true
			)
		}
	}

	if (error) {
		fulllog.push({
			type: 'error',
			data: error
		})
		dlogError(`Oooops ${error}`)
	}
	if (ctx) {
		fulllog.push({
			type: 'ctx',
			data: ctx
		})
	}
	if (plugin) {
		fulllog.push({
			type: 'plugin',
			data: plugin
		})
	}

	var clearUser = (user) => JSON.stringify(user).replace(/[{"}]/g, '').replace(/,/g, '\n').replace(/:/g, ': ')

	var text = `#Error ID:${logId}`
	if (plugin && plugin.id) {
		text += `\nPlugin ~> ${plugin.id}`
	}
	if (error) {
		text += `\nERROR ~>\n${error.toString()}\n`
	}
	if (ctx && ctx.from) {
		text += `\nFROM ~>\n${clearUser(ctx.from)}\n`
	}
	if (ctx && ctx.chat) {
		text += `\nCHAT ~>\n${clearUser(ctx.chat)}`
	}

	bot.telegram.sendMessage(process.env.log_chat, text.substring(0, 4000))

	var jsonData = stringify(fulllog)
	var remove = (name) => {
		jsonData = jsonData.replace(new RegExp(name, 'gi'), 'OPS_SECRET')
	}

	[
		process.env.telegram_token,
		process.env.giphy_token,
		process.env.github_token,
		process.env.host,
		process.env.secret_path,
		process.env.port
	].forEach(name => remove(name))

	return bot.telegram.sendDocument(
		process.env.log_chat,
		{
			filename: `${logId}.log.JSON`,
			source: Buffer.from(jsonData, 'utf8')
		}
	)
}

var inline = []
var callback = []

bot.use((ctx, next) => telegrafStart(ctx, next))

bot.context.plugins = []
bot.context.isAdmin = (ctx) => {
	if (admins.split(',').includes(ctx.from.id.toString())) {
		return true
	}
	return false
}

plugins.forEach(p => {
	var _ = require(`./plugins/${p}`)
	dlogBot(`Install plugin: ${_.id}`)
	bot.context.plugins.push(_)

	if (_.install) {
		try {
			_.install()
		} catch (e) {
			processError(e, false, _)
		}
	}

	if (_.plugin) {
		bot.hears(_.regex, async (ctx) => {
			dlogPlugins(`Runnig cmd plugin: ${_.name}`)
			try {
				await _.plugin(ctx)
			} catch (e) {
				processError(e, ctx, _)
			}
		})
	}

	if (_.inline) {
		inline.push(_)
	}

	if (_.callback) {
		callback.push(_)
	}
})

bot.on('inline_query', async (ctx) => {
	var isFound = false
	var text = '/' + ctx.update.inline_query.query.replace(/^\//, '')
	for (var _ of inline) {
		var regex = _.regex
		var match = false
		if (Array.isArray(regex)) {
			var check = false
			for (var reg of regex) {
				regex.lastIndex = 0
				check = reg.exec(text || '')
				if (check) {
					match = check
				}
			}
		} else {
			regex.lastIndex = 0
			match = regex.exec(text || '')
		}
		if (match) {
			isFound = true
			ctx.match = match
			dlogInline(`Runnig inline plugin: ${_.name}`)
			try {
				await _.inline(ctx)
			} catch (e) {
				processError(e, ctx, _)
			}
		}
	}
	if (!isFound) {
		ctx.answerInlineQuery([{
			type: 'article',
			title: 'Não há resultados!',
			id: 'notfound',
			input_message_content: {
				message_text: 'Não há resultados!'
			}
		}], {
			cache_time: 0
		})
	}
})

bot.on('callback_query', async (ctx) => {
	if (ctx.update && ctx.update.callback_query && ctx.update.callback_query.data) {
		var data = ctx.update.callback_query.data
		for (var _ of callback) {
			if (data.startsWith(_.id)) {
				ctx.match = [].concat(data, data.split(':'))
				dlogCallback(`Runnig callback plugin: ${_.name}`)
				try {
					await _.callback(ctx)
				} catch (e) {
					processError(e, ctx, _)
				}
			}
		}
	}
})

bot.catch((err) => {
	try {
		processError(err, false, false)
	} catch (e) {
		dlogError(`Oooops ${err}`)
		dlogError(`OH!!! ${e}`)
	}
})

if (isWebhook) {
	//path, TLS options, port
	bot.startWebhook(process.env.secret_path, null, process.env.port)
} else {
	bot.startPolling()
}

module.exports = bot
