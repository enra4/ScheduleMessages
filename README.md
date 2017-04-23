# ScheduleMessages

schedule your discord messages so you dont wake up bae at night with push notifications.
works for regular text channels aswell as DMs.

## how to

```sh
git clone https://github.com/enra4/ScheduleMessages
cd ScheduleMessages
npm install
# go into app.js and place your token there
# it can be found in the discord client, ctrl + shift + i > Application > Local Storage
node app.js
>> save niker <nikers ID>
>> send niker 60 dont forget to brush your teeth when you wake up!!!1
>> send niker 60 also have a nice day!!!§§ # multiple messages can be scheduled
>> donezo # exits app (you should wait until your messages have been sent though..)
```

* saves niker to contact list (you can go into channels.json to modify them later)
* schedules two messages to be sent to niker in 60 minutes
* exits app

also a help command exists if you really want to use it

## how tf do i get the ID from a channel/user??!??!

Settings > Appearance > check Developer Mode > right click any channel/user and copy ID
