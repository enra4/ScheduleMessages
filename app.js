const Discord = require('discord.io')
const fs = require('fs')
const readline = require('readline')
const fileName = './channels.json'
let channels = require(fileName)

const token = '' // insert token here

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

function prompt() {
	rl.question('>> ', (input) => {
		input = input.split(' ')
		switch (input[0]) { // commands
			case 'donezo':
				process.exit()
				break
			case 'save':
				channels[input[1]] = input[2]
				fs.writeFile(fileName, JSON.stringify(channels), (err) => {
					if (err) {
						console.log('something went wrong when writing to file')
						process.exit()
					}
				})
				break
			case 'send':
				let channel = input[1]
				let time = parseInt(input[2]) * 60 * 1000 // from minutes => milliseconds
				for (let i = 0; i < 3; i++) {
					input.shift()
				}

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
								message: input.join(' ')
							})
							UserClient.disconnect()
						})
						UserClient.connect()
					}, time)
				}

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
