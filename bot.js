/* 
** Created by Ian Mukherjee and Aidan Gomez as part of Kouch, Inc.
** HOW TO MAKE A DISCORD BOT: https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
** HOW TO HOST A DISCORD BOT ON HEROKU: https://medium.com/@mason.spr/hosting-a-discord-js-bot-for-free-using-heroku-564c3da2d23f
** OCTOKIT API DOCUMENTATION: https://octokit.github.io/rest.js/v18
** DISCORD.JS DOCUMENTATION: https://discord.js.org/#/docs/main/stable/general/welcome
*/

// https://www.npmjs.com/package/dotenv
const config = require('dotenv').config();
const Discord = require('discord.js');
const { Octokit } = require("@octokit/rest");

const prefix = '!';
const owner = config.OWNER;
const repo = config.REPO;
const authorizedChannels = process.argv.slice(2); // Retrieve authorized channels from command line (e.g., `node bot.js bugs`)
const client = new Discord.Client();
const gh = new Octokit({
    auth: config.CLIENT_SECRET,
});

client.once('ready', () => {
    console.log(`Ready!`);
});

client.login(config.DISCORD_TOKEN);

client.on('message', function (message) {
    console.log('Discord channel: ' + message.channel.name);
    if (message.author.bot) return; // if the message was created by the bot, do not reply
    if (!message.content.startsWith(prefix)) return; // if the message does not start with '!', do not reply
    if (!authorizedChannels.includes(message.channel.name)) return; // if the message is not in an authorized channel, do not reply
    const commandBody = message.content.slice(prefix.length);
    if(commandBody.includes('[TITLE]')) {
        console.log('commandBody: ' + commandBody);
        const args = commandBody.split(' [TITLE] ');
        console.log('args: ' + args);
        const command = args.shift().toLowerCase();
        console.log('command: ' + command);
    
        if (command === "issue") {
            createGithubIssue(args[1]);
            message.reply('Thank you for reporting your issue to the Kouch team!');                      
        }
    } else {
        message.reply('Please make sure your issue is in the following format: !issue [TITLE] description of your issue'); 
    }
});

const createGithubIssue = (title) => {
    console.log('creating github issue');
    try {
        gh.issues.create({
            owner,
            repo,
            title,
          });
    } catch (err) {
        console.log('Error in createGithubIssue: ' + err)
    }

}