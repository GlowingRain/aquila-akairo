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

    // Prompts
    defaultPrompt: {
        timeout: message => 'El tiempo se agotó, se ha cancelado el comando.',
        ended: message => 'Se ha cancelado el comando debido a multiples intentos.',
        cancel: message => 'El comando ha sido cancelado.',
        cancelWord: 'cancelar',
        retries: 2,
        time: 30000
    },

    // Directories
    commandDirectory: './src/commands/',
    listenerDirectory: './src/listeners/',

    // CommandRelated
    automateCategories: true,
    commandUtil: true,

}, { disableEveryone: true });

client.login();
