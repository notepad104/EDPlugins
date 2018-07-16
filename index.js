const Telegraf = require('telegraf')
const debug = require('debug')
//const gscomplet = require('gsearch')

const bot = new Telegraf(process.env.telegram_token)

const dlogBot = debug("bot")
const dlogPlugins = debug("bot:plugins")
const dlogInline = debug("bot:inline")
const dlogError = debug("bot:error")

/*function autocomplent(query) {
	console.log(`Input: ${query}`)
	gscomplet.suggest('query', function(error, data, res) {
		console.log('Autocomplent', data);
	});
}*/

//bot.telegram.deleteWebhook()

dlogBot("Start bot")
bot.telegram.sendMessage('89198119',
	'*BOT INICIADO*\nLOVE NODEJS', {
		parse_mode: "Markdown"
	}
)

const plugins = [
	'9gag',
	'coelho',
	//'dado',
	//example'
	'gif',
	'github',
	//'google'
	'latex',
	//'perguntas',
	'ping',
	'xkcd'
]

var inline = []

plugins.forEach(p => {
	dlogPlugins(`Install plugin: ${p}`)
	var _ = require(`./plugins/${p}`)
	if (_.plugin) {
		bot.hears(_.regex, async (ctx) => {
			dlogPlugins(`Runnig cmd plugin: ${_.name}`)
			_.plugin(ctx)
		})
	}
	if (_.inline) {
		inline.push(_)
	}
})

bot.on('inline_query', (ctx) => {
	var isFound = false
	var text = '/' + ctx.update.inline_query.query
	inline.forEach(_ => {
		var regex = _.regex
		regex.lastIndex = 0
		var match = regex.exec(text || '')
		if (match) {
			isFound = true
			ctx.match = match
			dlogInline(`Runnig inline plugin: ${_.name}`)
			_.inline(ctx)
		}
	})
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

bot.catch((err) => {
	dlogError(`Oooops ${err}`)
})

bot.startPolling()
