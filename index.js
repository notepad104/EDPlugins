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
	'gif',
	//'google'
	'latex',
	//'perguntas',
	'ping',
	'xkcd'
]
plugins.forEach(p => {
	dlogPlugins(`Install plugin: ${p}`)
	var _ = require(`./plugins/${p}`)
	bot.hears(_.regex, async (ctx) => {
		dlogPlugins(`Runnig plugin: ${p}`)
		_.plugin(ctx)
	})
})


bot.catch((err) => {
	dlogError(`Oooops ${err}`)
})

bot.startPolling()
