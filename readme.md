# Kouch Gitcord Bot

You can run the Gitcord Bot locally by running the following command in your local gitcord-bot directory: `node bot.js`

When your changes and complete and you'd like to push them to production, use the following command: `git push heroku master`

Before pushing to `heroku master`, make sure you are logged in by running `heroku login` and entering your heroku username and password.

Note: Unfortunately, since Github has recently changed their `master` branches to `main`, you'll need to be careful not to run `git push` as this can disable your ability to push up to heroku.

In order to run the bot live on our server, you'll need to deploy the worker on heroku: `heroku ps:scale worker=1`

