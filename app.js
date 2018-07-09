const Discord = require('discord.io')
const fs = require('fs')
const moment = require('moment')
const readline = require('readline')

let channels = require('./channels.json')

const token = '' // insert token here

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const sendMessage = (channel, message, delay) => {
	if (!channels[channel]) {
		console.log('sorry but channel/user isnt saved in your contact list :x')
		console.log('pls use "save <name> <channelID/userID>"')
	} else {
		setTimeout(() => {
			let UserClient = new Discord.Client({
				token: token,
				autorun: false
			})

			UserClient.on('ready', (event) => {
				UserClient.sendMessage({
					to: channels[channel],
					message: message
				})
				UserClient.disconnect()
			})
			UserClient.connect()
		}, delay)
	}
}

const prompt = () => {
	rl.question('>> ', input => {
		input = input.split(' ')
		switch (input[0]) { // commands
			case 'donezo':
				process.exit()
				break
			case 'help':
				console.log('	donezo					// exits prompt')
				console.log('	help					// shows this page ..hello???')
				console.log('	save <name> <channelID/userID>		// saves to contacts')
				console.log('	send <name> <minutes> <message>		// sends scheduled message')
				break
			case 'save':
				channels[input[1]] = input[2]
				fs.writeFile('./channels.json', JSON.stringify(channels), (err) => {
					if (err) {
						console.log('something went wrong when writing to file')
						process.exit()
					}
				})
				break
			case 'send':
				// :thinking:
				(() => {
					const channel = input[1]
					const delay = parseInt(input[2]) * 60 * 1000 // from minutes => milliseconds
					for (let i = 0; i < 3; i++) {
						input.shift()
					}

					const message = input.join(' ')
					sendMessage(channel, message, delay)
				})()
				break
			case 'send-date':
				(() => {
					const channel = input[1]

					const scheduled = moment(input[2])
					const offset = moment().utcOffset()
					const delay = moment(scheduled).diff(moment().add(offset, 'minutes'))

					for (let i = 0; i < 3; i++) {
						input.shift()
					}

					const message = input.join(' ')
					sendMessage(channel, message, delay)
				})()
				break
			default:
				console.log('you typed something invalid silly')
				break
		}

		prompt()
		return
	})
}

prompt()
