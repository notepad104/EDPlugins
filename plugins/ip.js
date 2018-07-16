const request = require('request-promise-native')

async function base(ip) {
	var data = await request({
		baseUrl: 'http://ip-api.com', //TODO: Check https
		uri: `/json/${encodeURIComponent(ip.replace(/http[s]*:\/\//i, ''))}`
	})
	data = JSON.parse(data)
	if (!data.lat) {
		var error = `Este \`${ip}\`, não é um dominio válido.\n`
		error += 'Por favor, informe um dominio válido para que eu possa está enviando as informaçoes sobre o mesmo.'
		return {
			error: true,
			output: error
		}
	}
	var output = ''
	if (data.as) {
		output += `*Hospedado por:* ${data.as}\n`
	}
	if (data.isp) {
		output += `*Provedor:* ${data.isp}\n`
	}
	if (data.city) {
		output += `*Cidade:* ${data.city}\n'`
	}
	if (data.regionName) {
		output += `*Região:* ${data.regionName}\n`
	}
	output += `*Pais:* ${data.country} - ${data.countryCode}`
	return {
		error: false,
		output: output,
		lat: data.lat,
		lon: data.log,
		country: `${data.country} - ${data.countryCode}`
	}
}

async function plugin(ctx) {
	var info = await base(ctx.match[1])
	ctx.replyWithMarkdown(info.output)
	if (!info.error) {
		//TODO: Venue: info.lat, info.lon, info.country
	}
	return
}

async function inline(ctx) {
	var input = ctx.match[1]
	var info = await base(input)
	var results = []
	results.push({
		type: 'article',
		title: `Info do IP: ${input}`,
		id: `ip`,
		input_message_content: {
			message_text: info.output,
			parse_mode: 'Markdown'
		}
	})
	if (!info.error) {
		//TODO: Inline Venue: `Mapa para o IP: ${input}` info.lat, info.lon, info.country
	}
	ctx.answerInlineQuery(results, {
		cache_time: 0
	})
}

module.exports = {
	name: 'IP',
	about: 'Retona informações sobre ip/site.',
	regex: /^\/ip\s*(.+)/i,
	example: '/ip synko.com.br',
	classification: ['Ferramentas', 'Pesquisa'],
	plugin,
	inline
}
