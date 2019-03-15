const { AkairoClient } = require('discord-akairo');
require('dotenv').config();

const client = new AkairoClient({
    // Settings
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    
    // Emiters
    emitters: {
        process
    },

    // Directories
    commandDirectory: './src/commands/',
    listenerDirectory: './src/listeners/',

    // CommandRelated
    automateCategories: true,
    commandUtil: true,
    
}, { disableEveryone: true });

client.login();
