const { AkairoClient } = require('discord-akairo');
require('dotenv').config();

const client = new AkairoClient({
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    commandDirectory: './src/commands/',
    listenerDirectory: './src/listeners/',
    automateCategories: true,
    commandUtil: true,
}, { disableEveryone: true });

// Extra Modules
client.logger = require('./src/utils/logger');

client.login();
