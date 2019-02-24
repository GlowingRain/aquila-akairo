const { AkairoClient } = require('discord-akairo');
require('dotenv').config();

const client = new AkairoClient({
<<<<<<< HEAD
    ownerID: '543106179774021654',
    prefix: 'a!',
    commandDirectory: './src/main/commands/',
});

client.login().then(() => {
    console.log('Started up!');
});
=======
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    commandDirectory: './src/commands/',
}, {
        disableEveryone: true
    });

client.login();
>>>>>>> 2fe925dc3596cae220a57f47969317e76026dff8
