const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.telegram_token)
var log = `*Travis CI Job*: [#${process.env.TRAVIS_JOB_NUMBER}](https://travis-ci.org/SynkoDevelopers/EDPlugins/jobs/${process.env.TRAVIS_JOB_ID})`
var status = process.argv[2]
if (status == 'succeeded') {
	log += '\n✅ CI: Succeeded'
} else {
	log += '\n‼️ CI: Failed'
}
bot.telegram.sendMessage(process.env.log_chat,
	log, {
		parse_mode: 'Markdown'
	}
)
