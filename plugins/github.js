var axios = require('axios')

async function base(user) {
	var response = await axios({
		method: 'GET',
		url: `https://api.github.com/users/${encodeURIComponent(user)}`,
		headers: { //TODO: Check
			'User-Agent': 'RoboED-Bot-Telegram',
			'Authorization': `token ${process.env.github_token}`
		}
	})
	var data = response.data
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
	id: 'github',
	name: 'GitHub',
	about: 'Retona informações sobre um perfil do GitHub.',
	regex: /^\/github\s*(.+)/i,
	example: '/github TiagoDanin',
	classification: ['Ferramentas', 'Pesquisa'],
	plugin,
	inline
}
