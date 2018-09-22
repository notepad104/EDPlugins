const TelegrafTest = require('telegraf-test')
const expect = require('expect.js')
const debug = require('debug')
const bot = require('..')

const dlogEnv = debug('bot:test:env')
const dlogResponse = debug('bot:test:response')

dlogEnv(process.env)

const test = new TelegrafTest({})
test.setUser({id: 89198119})
test.setChat({id: 89198119})

describe('Plugins', function() {
	it('/9gag', async function() {
		var r = await test.sendMessageWithText('/9gag')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('http://9gag.com/gag/')
		expect(r.data.text).to.contain('👍')
	})
	it('/calc 7*1+5', async function() {
		var r = await test.sendMessageWithText('/calc 7*1+5')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Pelos meus calculos:* `7*1+5 = 12`')
	})
	it('/coelho', async function() {
		var r = await test.sendMessageWithText('/coelho')
		expect(r.data.document).to.be.a('string')
		expect(r.data.document).to.contain('https://bunnies.media/')
	})
	it('/dado 3d10', async function() {
		var r = await test.sendMessageWithText('/dado 3d10')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Rodando* `10` *dados, com* `3` *lados')
	})
	it('/girar 5', async function() {
		var r = await test.sendMessageWithText('/girar 5')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Rodando* `1` *dado, com* `5` *lados')
	})
	it('/girar 1', async function() {
		var r = await test.sendMessageWithText('/girar 1')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('⚠️ *Atenção:* O número mínimo de lados é `2`')
	})
	it('/echo test', async function() {
		var r = await test.sendMessageWithText('/echo test')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Echo*: test')
	})
	it('/gif bot', async function() {
		var r = await test.sendMessageWithText('/gif bot')
		expect(r.data.document).to.be.a('string')
		expect(r.data.document).to.contain('giphy.com')
		expect(r.data.document).to.contain('media/')
	})
	it('/github tiagodanin', async function() {
		var r = await test.sendMessageWithText('/github tiagodanin')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Tiago Danin')
		expect(r.data.text).to.contain('https://github.com/TiagoDanin')
		expect(r.data.text).to.contain('\n🌐 <a href="https://TiagoDanin.github.io/">Blog</a>\n')
	})
	/*it('/google tiagodanin', async function() {
		var r = await test.sendMessageWithText('/google tiagodanin')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('-> <a href="https://TiagoDanin.github.io/">Tiago Danin</a>')
	})*/
	it('/help', async function() {
		var r = await test.sendMessageWithText('/help')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Temos um total de')
	})
	it('/help c_Ferramentas', async function() {
		var r = await test.sendMessageWithText('/help c_Ferramentas')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('<b>Escolha um plugin!</b>')
	})
	it('/ip 8.8.8.8', async function() {
		var r = await test.sendMessageWithText('/ip 8.8.8.8')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Provedor:* Google')
		expect(r.data.text).to.contain('*Cidade:* Mountain View')
		expect(r.data.text).to.contain('*Pais:* United States - US')
	})
	it('/ip hacknet.2018.br.top', async function() {
		var r = await test.sendMessageWithText('/ip hacknet.2018.br.top')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Este `hacknet.2018.br.top`, não é um dominio válido.')
	})
	it('/latex RoboED', async function() {
		var r = await test.sendMessageWithText('/latex RoboED')
		expect(r.data).to.be.a('string')
		expect(r.data).to.contain('content-disposition:form-data; name="sticker"; filename="sticker.webp"')
		expect(r.data).to.contain('sendSticker')
	})
	it('/lmgtfy como fica rico', async function() {
		var r = await test.sendMessageWithText('/lmgtfy como fica rico')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('<b>-></b> <a href="http://lmgtfy.com/?q=como%20fica%20rico">como fica rico</a>')
	})
	it('/perguntas sim ou não?', async function() {
		var r = await test.sendMessageWithText('/perguntas sim ou não?')
		expect(r.data.text).to.be.a('string')
	})
	it('/ping', async function() {
		var r = await test.sendMessageWithText('/ping')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('Pong 🎾')
	})
	it('/soteio Tiago, Yan, Wesley', async function() {
		var r = await test.sendMessageWithText('/soteio Tiago, Yan, Wesley')
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.match(/tiago|yan|wesley/i)
	})
	/*it('/torrent ArchLinux', async function() {
		var r = await test.sendMessageWithText('/torrent ArchLinux')
		console.log(r)
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Echo*: test')
	})
	it('/xkcd', async function() {
		var r = await test.sendMessageWithText('/xkcd')
		console.log(r)
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Echo*: test')
	})
	it('/xkcd 4', async function() {
		var r = await test.sendMessageWithText('/xkcd 4')
		console.log(r)
		expect(r.data.text).to.be.a('string')
		expect(r.data.text).to.contain('*Echo*: test')
	})*/
})
