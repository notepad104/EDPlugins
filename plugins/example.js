function plugin(ctx) {
	return ctx.reply(':)')
}

function inline(ctx) {
	return //Soon
}

const about = 'Sobre esse plugin'
const regex = /^\/command-regex/i

module.exports = {
	plugin,
	inline, //Soon
	about,
	regex
}
