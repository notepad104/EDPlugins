const Telegraf = require('telegraf')
const debug = require('debug')
//const gscomplet = require('gsearch')

var webhookReply = process.env.webhook_reply == 'true' ? true : false
const isWebhook = process.env.webhook == 'true' ? true : false
const isTest = process.env.test == 'true' ? true : false
const admins = process.env.admins
const username = process.env.username

const telegrafOption = {
	telegram: { webhookReply: webhookReply },
	username: username
}
const bot = new Telegraf(process.env.telegram_token, telegrafOption)

if (!isWebhook) {
	webhookReply = false
}

if (!isTest) {
	bot.telegram.deleteWebhook()
}
if (isWebhook && !isTest) {
	bot.telegram.setWebhook(process.env.host, {})
}

const dlogBot = debug("bot")
const dlogPlugins = debug("bot:plugins")
const dlogInline = debug("bot:inline")
const dlogCallback = debug("bot:callback")
const dlogError = debug("bot:error")

/*function autocomplent(query) {
	console.log(`Input: ${query}`)
	gscomplet.suggest('query', function(error, data, res) {
		console.log('Autocomplent', data);
	});
}*/

dlogBot("Start bot")
var startLog = `
*BOT INICIADO*
*Modo de recebimento*: ${isWebhook ? 'webhook' : 'polling'}
*Mode de retorno*: ${webhookReply ? 'Resposta ao webhook': 'normal'}
`
if (isTest && process.env.TRAVIS_JOB_NUMBER) {
	startLog += `\n[Travis CI Job: #${process.env.TRAVIS_JOB_NUMBER}](https://travis-ci.org/SynkoDevelopers/EDPlugins/jobs/${process.env.TRAVIS_JOB_ID})`
}
bot.telegram.sendMessage(process.env.log_chat,
	startLog, {
		parse_mode: 'Markdown'
	}
)

const plugins = [
	'9gag',
	'calculadora',
	'callback',
	'coelho',
	'dado',
	'echo',
	'example',
	'gif',
	'github',
	'help',
	//'google', TODO: Add Test
	//'ip', TODO: InProgress
	'latex',
	'lmgtfy',
	'perguntas',
	'ping',
	'soteio',
	'text',
	//'torrent', TODO: Check
	'xkcd'
]


var inline = []
var callback = []

bot.use((ctx, next) => {
	if (ctx.update && ctx.update.message && ctx.update.message.text) {
		if (ctx.update.message.text.startsWith('/start')) {
			ctx.update.message.text = ctx.update.message.text.replace('start ', '').replace(/-/g, ' ')
		}
	}
	return next(ctx)
})

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

	if (_.plugin) {
		bot.hears(_.regex, async (ctx) => {
			dlogPlugins(`Runnig cmd plugin: ${_.name}`)
			await _.plugin(ctx)
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
	var text = '/' + ctx.update.inline_query.query
	for (var _ of inline) {
		var regex = _.regex
		regex.lastIndex = 0
		var match = regex.exec(text || '')
		if (match) {
			isFound = true
			ctx.match = match
			dlogInline(`Runnig inline plugin: ${_.name}`)
			await _.inline(ctx)
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
				await _.callback(ctx)
			}
		}
	}
})

bot.catch((err) => {
	dlogError(`Oooops ${err}`)
})

if (isWebhook) {
	//path, TLS options, port
	bot.startWebhook(process.env.secret_path, null, process.env.port)
} else {
	bot.startPolling()
}
