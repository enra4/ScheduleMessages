# discord-schedule-messages

schedule your discord messages so you dont wake up bae at night with push notifications.
works for regular text channels aswell as DMs.

## how to

```
$ git clone https://github.com/enra4/ScheduleMessages
$ cd ScheduleMessages
$ npm install
```

### commands

```
contacts
donezo
help
save <name> <ChannelID/UserID> <dm?true|false>
send <name> <minutes> <message>
send <name> <timestamp> <message>
```


### examples

```
$ node app.js
>> save niker <nikers UserID> true
>> save #general <#general's ChannelID> false
>> send niker 60 dont forget to brush your teeth when you wake up!!!1
>> send niker 60 also have a nice day!!!§§
>> send #general 2 this message is from the past
>> send niker 2018-07-13 messagerino
>> send niker 2018-07-13T14:53 minute specific also works wowie
>> send niker 2018-07-13T14:55:42 or even second specific!!!!212
>> donezo
```

* saves niker to the contact list (you can go into contacts.json to modify them later)
* saves a #general channel to the contact list
* schedules two messages to be sent to niker in 60 minutes
* schedules a message to be sent to the #general chat in 2 minutes
* sends some date specific messages
* exits app

also a help command exists if you really want to use it

## how tf do i get the ID from a channel/user??!??!

Settings > Appearance > check Developer Mode > right click any channel/user and copy ID

## thanks to

* [ibigfire](https://github.com/ibigfire) for improvements and fixes
