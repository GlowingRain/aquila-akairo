const { AkairoClient } = require('discord-akairo');
require('dotenv').config();

const client = new AkairoClient({
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    commandDirectory: './src/commands/',
}, {
        disableEveryone: true
    });

client.login();