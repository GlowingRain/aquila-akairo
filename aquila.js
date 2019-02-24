const { AkairoClient } = require('discord-akairo');
require('dotenv').config();

const client = new AkairoClient({
    ownerID: '543106179774021654',
    prefix: 'a!',
    commandDirectory: './src/main/commands/',
});

client.login().then(() => {
    console.log('Started up!');
});