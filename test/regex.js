const axios = require('axios')
const expect = require('expect.js')
const debug = require('debug')
const bot = require('..')

const dlogEnv = debug('bot:test:env')
const dlogResponse = debug('bot:test:response')

dlogEnv(process.env)

describe('Regex', function() {
	var test = (regex) => {
		it(`regex: ${regex.toString()}`, async function() {
			regex.exec('test')
		})
	}
	for (var plugin of bot.context.plugins) {
		var regex = plugin.regex
		if (regex) {
			if (Array.isArray(regex)) {
				for (var reg of regex) {
					test(reg)
				}
			} else {
				test(regex)
			}
		}
	}
})
