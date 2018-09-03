const request = require('request-promise-native')

async function base(user) {
	var data = await request({
		baseUrl: 'https://api.github.com',
		uri: `/users/${encodeURIComponent(user)}`,
		agent: false,
		timeout: 5000,
		pool: {
			maxSockets: 100
		},
		headers: {
			'User-Agent': 'RoboED-Bot-Telegram'
		}
	})
	data = JSON.parse(data)
	var name = data.login
	if (data.name) {
		name = data.name
	}
	var output = `<a href="https://github.com/${data.login}">${name}</a>\n`
	if (data.bio) {
		output += `💬 ${data.bio}\n`
	}
	output += `👤 <code>${data.following}</code> | 👥 <code>${data.followers}</code>\n`
	if (data.blog) {
		output += `🌐 <a href="${data.blog}">Blog</a>\n`
	}
	if (data.public_repos) {
		output += `📁 <a href="https://github.com/${data.login}?tab=repositories">${data.public_repos}</a>`
	}
	return {
		name: name,
		login: data.login,
		data: data,
		output: output
	}
}

async function plugin(ctx) {
	var info = await base(ctx.match[1])
	return ctx.replyWithHTML(info.output)
}

async function inline(ctx) {
	var info = await base(ctx.match[1])

	ctx.answerInlineQuery([
		{
			type: 'article',
			title: `GitHub: ${info.name}`,
			id: `github${info.login}`,
			input_message_content: {
				message_text: info.output,
				parse_mode: 'HTML'
			}
		}
	], {
		cache_time: 0
	})
}

module.exports = {
	name: 'GitHub',
	about: 'Retona informações sobre um perfil do GitHub.',
	regex: /^\/github\s*(.+)/i,
	example: '/github TiagoDanin',
	classification: ['Ferramentas', 'Pesquisa'],
	plugin,
	inline
}
