#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')

const Eris = require('eris')
const moment = require('moment')

const contacts = require('./contacts.json')

const token = '' // insert token here

if (token.length === 0) {
	console.log('  remember to insert your token into app.js :)')
	process.exit()
}

const stdin = process.stdin
const stdout = process.stdout

// always exit on CTRL^C
readline.emitKeypressEvents(stdin)
stdin.on('keypress', (ch, key) => {
	if (key.ctrl && key.name === 'c') {
		console.log('\n')
		process.exit()
	}
})

const rl = readline.createInterface({
	input: stdin,
	output: stdout
})

const sendMessage = (name, message, delay) => {
	if (!contacts[name]) {
		console.log('  sorry but channel/user isnt saved in your contact list :x')
		console.log('  pls use "save <name> <ChannelID/UserID>"')
	} else {
		setTimeout(() => {
			const bot = new Eris(token)
			bot.on('ready', () => {
				if (contacts[name].dm) {
					(async () => {
						const channel = await bot.getDMChannel(contacts[name].id)
						channel.createMessage(message)
						bot.disconnect()
					})()
				} else {
					bot.createMessage(contacts[name].id, message)
					bot.disconnect()
				}
			})
			bot.connect()
		}, delay)
	}
}

const prompt = () => {
	rl.question('>> ', input => {
		try {
			input = input.split(' ')
			switch (input[0]) { // commands
				case 'contacts':
					for (const contact in contacts) {
						console.log(`  ${contact}`)
					}

					break
				case 'donezo':
					console.log('')
					process.exit()
					break
				case 'help':
					console.log(`  commands:
	contacts
	donezo
	help
	save <name> <ChannelID/UserID> <dm?true|false>
	send <name> <minutes> <message>
	send-date <name> <timestamp> <message>

  for examples, read the readme at https://github.com/enra4/discord-schedule-messages
					`)
					break
				case 'save':
					contacts[input[1]] = {
						id: input[2],
						dm: eval(input[3].toLowerCase())
					}

					fs.writeFile('./contacts.json', JSON.stringify(contacts, null, 4), (err) => {
						if (err) {
							console.log('something went wrong when writing to file')
							process.exit()
						}
					})
					break
				case 'send':
					// :thinking:
					(() => {
						const name = input[1]
						const delay = parseInt(input[2]) * 60 * 1000 // from minutes => milliseconds
						for (let i = 0; i < 3; i++) {
							input.shift()
						}

						const message = input.join(' ')
						sendMessage(name, message, delay)
					})()
					break
				case 'send-date':
					(() => {
						const name = input[1]

						const scheduled = moment(input[2])
						const offset = moment().utcOffset()
						const delay = moment(scheduled).diff(moment().add(offset, 'minutes'))

						for (let i = 0; i < 3; i++) {
							input.shift()
						}

						const message = input.join(' ')
						sendMessage(name, message, delay)
					})()
					break
				default:
					console.log('you typed something invalid silly')
					break
			}
		} catch (err) {
			console.log(' something went wrong, please use command "help"')
		}

		prompt()
		return
	})
}

prompt()
