var axios = require('axios')

var commits = [
	'UP'
]

function install() {
	return axios({
		method: 'GET',
		url: 'https://raw.githubusercontent.com/ngerakines/commitment/master/commit_messages.txt',
		headers: {
			'User-Agent': 'RoboED-Bot-Telegram',
			'Authorization': `token ${process.env.github_token}`
		}
	}).then((r) => {
		return `${r.data}`.split('\n').forEach((commit) => commits.push(commit))
	})
}

function base (input) {
	return commits[Math.floor((Math.random() * commits.length))]
}

function plugin(ctx) {
	return ctx.reply(base())
}

function inline(ctx) {
	return ctx.answerInlineQuery([
		{
			type: 'article',
			title: 'Ver commit.',
			id: 'commits',
			input_message_content: {
				message_text: base(),
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	id: 'commits',
	name: 'Commits',
	about: 'Enviar o melhor commit para seu código.',
	regex: /^\/commit[s]*/i,
	example: '/commit',
	classification: ['Ferramentas'],
	plugin,
	inline,
	install
}
