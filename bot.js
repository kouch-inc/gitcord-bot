const config = require('dotenv').config();
const Discord = require('discord.js');
const { Octokit } = require("@octokit/rest");

// Initialize Discord Bot
const prefix = '!';
const owner = config.OWNER;
const repo = config.REPO;
const client = new Discord.Client();
client.once('ready', () => {
    console.log(`Ready!`);
});
const gh = new Octokit({
    auth: config.CLIENT_SECRET,
});
client.login(config.DISCORD_TOKEN);
client.on('message', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
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
    // Ask user for a short summary of the bug
    // Ask user to describe the bug in detail
    // Create Github issue from information received
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