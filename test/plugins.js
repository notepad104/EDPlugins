const axios = require('axios')
const expect = require('expect.js')
const debug = require('debug')
const bot = require('..')

const dlogEnv = debug('bot:test:env')
const dlogResponse = debug('bot:test:response')

dlogEnv(process.env)

async function sendData(text) {
	var response = await axios({
		method: 'POST',
		url: 'http://127.0.0.1:3000/secret-path',
		headers: {
			'content-type': 'application/json'
		},
		data: {
			update_id: 1,
			message: {
				message_id: 1,
				from: {
					id: 89198119,
					is_bot: false,
					first_name: '@TiagoEDGE',
					last_name: '',
					username: 'TiagoEDGE',
					language_code: 'en-US'
				},
				chat: {
					id: 89198119,
					first_name: '@TiagoEDGE',
					last_name: '',
					username: 'TiagoEDGE',
					type: 'private'
				},
				date: 1535911953,
				text: text
			}
		},
	})
	dlogResponse(response)
	return response.data
}

describe('Plugins', function() {
	it('/9gag', async function() {
		var r = await sendData('/9gag')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('http://9gag.com/gag/')
		expect(r.text).to.contain('👍')
	})
	it('/calc 7*1+5', async function() {
		var r = await sendData('/calc 7*1+5')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Pelos meus calculos:* `7*1+5 = 12`')
	})
	it('/coelho', async function() {
		var r = await sendData('/coelho')
		expect(r.document).to.be.a('string')
		expect(r.document).to.contain('https://bunnies.media/')
	})
	it('/dado 3d10', async function() {
		var r = await sendData('/dado 3d10')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Rodando* `10` *dados, com* `3` *lados')
	})
	it('/girar 5', async function() {
		var r = await sendData('/girar 5')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Rodando* `1` *dado, com* `5` *lados')
	})
	it('/girar 1', async function() {
		var r = await sendData('/girar 1')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('⚠️ *Atenção:* O número mínimo de lados é `2`')
	})
	it('/echo test', async function() {
		var r = await sendData('/echo test')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})
	it('/gif bot', async function() {
		var r = await sendData('/gif bot')
		expect(r.document).to.be.a('string')
		expect(r.document).to.contain('giphy.com')
		expect(r.document).to.contain('media/')
	})
	it('/github tiagodanin', async function() {
		var r = await sendData('/github tiagodanin')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('Tiago Danin')
		expect(r.text).to.contain('https://github.com/TiagoDanin')
		expect(r.text).to.contain('\n🌐 <a href="https://TiagoDanin.github.io/">Blog</a>\n')
	})
	/*it('/google tiagodanin', async function() {
		var r = await sendData('/google tiagodanin')
		console.log(r)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})*/
	it('/help', async function() {
		var r = await sendData('/help')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('Temos um total de')
	})
	it('/help c_Ferramentas', async function() {
		var r = await sendData('/help c_Ferramentas')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('<b>Escolha um plugin!</b>')
	})
	it('/ip 8.8.8.8', async function() {
		var r = await sendData('/ip 8.8.8.8')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Provedor:* Google')
		expect(r.text).to.contain('*Cidade:* Mountain View')
		expect(r.text).to.contain('*Pais:* United States - US')
	})
	it('/ip hacknet.2018.br.top', async function() {
		var r = await sendData('/ip hacknet.2018.br.top')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('Este `hacknet.2018.br.top`, não é um dominio válido.')
	})
	it('/latex RoboED', async function() {
		var r = await sendData('/latex RoboED')
		expect(r).to.be.a('string')
		expect(r).to.contain('content-disposition:form-data; name="sticker"; filename="sticker.webp"')
		expect(r).to.contain('sendSticker')
	})
	it('/lmgtfy como fica rico', async function() {
		var r = await sendData('/lmgtfy como fica rico')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('<b>-></b> <a href="http://lmgtfy.com/?q=como%20fica%20rico">como fica rico</a>')
	})
	it('/perguntas sim ou não?', async function() {
		var r = await sendData('/perguntas sim ou não?')
		expect(r.text).to.be.a('string')
	})
	it('/ping', async function() {
		var r = await sendData('/ping')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('Pong 🎾')
	})
	it('/soteio Tiago, Yan, Wesley', async function() {
		var r = await sendData('/soteio Tiago, Yan, Wesley')
		expect(r.text).to.be.a('string')
		expect(r.text).to.match(/tiago|yan|wesley/i)
	})
	/*it('/torrent ArchLinux', async function() {
		var r = await sendData('/torrent ArchLinux')
		console.log(r)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})
	it('/xkcd', async function() {
		var r = await sendData('/xkcd')
		console.log(r)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})
	it('/xkcd 4', async function() {
		var r = await sendData('/xkcd 4')
		console.log(r)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})*/
})
