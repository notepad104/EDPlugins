const request = require('request-promise-native')
const bytelabel = require('bytelabel')

async function base(input) {
	var data = await request({
		baseUrl: 'https://torrentproject.se',
		uri: '/',
		qs: {
			out: 'json',
			orderby: 'latest',
			num: 10,
			s: input
		}
	})
	data = JSON.parse(data)
	var results = []
	if (data.total_found == '0') {
		results.push({
			title: 'Não há resultados',
			id: 'notfound',
			output: 'Não há resultados.'
		})
		return results
	}
	data.forEach(file => {
		//TODO: if file.seeds ~= 0
		var message = `💾 ${bytelabel(file.torrent_size,{round: true})} | 📤 Seeds: ${file.seeds} 📥 Leechers: ${file.leechs}\n`
		message    += `<a href="https://torrentproject.se/${file.torrent_hash}">${file.title}</a>\n\n`
		results.push({
			title: file.title,
			id: file.torrent_hash,
			output: message
		})
	})
	if (results.length == 0) {
		results.push({
			title: 'Não há resultados',
			id: 'notfound',
			output: 'Não há resultados.'
		})
	}
	return results
}

async function plugin(ctx) {
	var torrents = await base(ctx.match[1])
	var output = torrents.reduce((_, next) => _.output + next.output)
	return ctx.replyWithHTML(output)
}

async function inline(ctx) {
	var torrents = await base(ctx.match[1])
	var results = []
	torrents.forEach(torrent => {
		results.push({
			type: 'article',
			title: `${torrent.title}`,
			id: `torrent${torrent.id}`,
			input_message_content: {
				message_text: torrent.output,
				parse_mode: 'HTML'
			}
		})
	})
	ctx.answerInlineQuery(results, {
		cache_time: 0
	})
}

module.exports = {
	name: 'Torrents',
	about: 'Busca de arquivos Torrents.',
	regex: /^\/torrent[s]*\s(.+)/i,
	example: '/torrent ArchLinux',
	classification: ['Ferramentas', 'Pesquisa'],
	plugin,
	inline
}
