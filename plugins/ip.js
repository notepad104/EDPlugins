var axios = require('axios')

async function base(ip) {
	var baseUrl = 'http://ip-api.com'
	var response = await axios({
		method: 'GET',
		url: `${baseUrl}/json/${encodeURIComponent(ip.replace(/http[s]*:\/\//i, ''))}`,
		params: {
			media: 'gif'
		}
	})
	var data = response.data
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
		output += `*Cidade:* ${data.city}\n`
	}
	if (data.regionName) {
		output += `*Região:* ${data.regionName}\n`
	}
	output += `*Pais:* ${data.country} - ${data.countryCode}`
	return {
		error: false,
		output: output,
		lat: data.lat,
		lon: data.lon,
		country: `${data.country} - ${data.countryCode}`
	}
}

async function plugin(ctx) {
	var info = await base(ctx.match[1])
	if (!info.error) {
		ctx.replyWithMarkdown(info.output)
		return ctx.telegram.sendVenue(ctx.chat.id, info.lat, info.lon, info.country)
	} else {
		return ctx.replyWithMarkdown(info.output)
	}
	return
}

async function inline(ctx) {
	var input = ctx.match[1]
	var info = await base(input)
	var results = []
	if (!info.error) {
		results.push({
			type: 'article',
			title: `Não é um dominio válido: ${input}`,
			id: `ip:${info.output.lenght()}`,
			input_message_content: {
				message_text: info.output,
				parse_mode: 'Markdown'
			}
		})
	} else {
		results.push({
			type: 'article',
			title: `Info do IP: ${input}`,
			id: `ip:${info.output.lenght()}`,
			input_message_content: {
				message_text: info.output,
				parse_mode: 'Markdown'
			}
		})
		results.push({
			type: 'venue',
			title: `Localização do IP: ${input}`,
			id: `ip:mapa:${info.lat}:${info.lon}`,
			latitude: info.lat,
			longitude: info.lon,
			address: info.country
		})
	}
	ctx.answerInlineQuery(results, {
		cache_time: 0
	})
}

module.exports = {
	id: 'ip',
	name: 'IP',
	about: 'Retona informações sobre ip/site.',
	regex: /^\/ip[s\s]*(.*)/i,
	example: '/ip synko.com.br',
	classification: ['Ferramentas', 'Pesquisa'],
	plugin,
	inline
}
