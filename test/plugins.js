const request = require('request-promise-native')
const expect = require('expect.js')
const bot = require('..')

async function sendData(text) {
	var data = await request({
		method: 'POST',
		baseUrl: 'http://localhost:3000',
		uri: '/secret-path',
		timeout: 1500,
		headers: {
			'content-type': 'application/json'
		},
		body: {
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
		json: true
	})
	return data
}

describe('Plugins', function() {
	/*it('/9gag', async function() {
		var r = await sendData('/9gag')
		console.log(r)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})*/
	it('/calc 7*1+5', async function() {
		var r = await sendData('/calc 7*1+5')
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Pelos meus calculos:* `7*1+5 = 12`')
	})
	/*it('/coelho', async function() {
		var r = await sendData('/echo test')
		console.log(a)
		expect(r.text).to.be.a('string')
		expect(r.text).to.contain('*Echo*: test')
	})*/
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
})
