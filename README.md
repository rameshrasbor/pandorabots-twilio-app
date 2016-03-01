# Pandorabots on Twilio

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Connect your Pandorabot to a Twilio phone number.

## Requirements

You'll need to sign up for a plan on Chatbots.io to get an application ID and
user key. Once you've done this, you'll need to create a bot via the API (more
on this [here]())

You also need a Twilio account and an SMS enabled phone number.

## Setup

1. Click the "Deploy to Heroku" button above. Once you've done this, you'll be taken to a configuration secreen to enter all of the required configuration variables.
2. Return to Twilio - follow [these](https://www.twilio.com/help/faq/twilio-client/how-do-i-create-a-twiml-app) instructions to create a new TwiML app and associate it with your phone number.
3. Heroku will generate a URL for your app. In the Messages section of your TwiML app, make sure the "Request URL" field contains the URL.
4. Once you've saved and successfully deployed your app to Heroku, you can begin texting the number and receive replies from your Pandorabot.

> Note: this sets your Heroku app up with a free RedisToGo plan - this is fine for demonstration purposes, but you'll probably need to upgrade if you forsee your bot getting significant attention.

## Running locally

Clone the repository, then:

```
$ npm install
```

Create a .env file for configuration variables:

```sh
NODE_ENV=development
PORT=3000
TWILIO_AUTH_TOKEN=
PANDORABOTS_APP_ID=
PANDORABOTS_USER_KEY=
PANDORABOTS_BOTNAME=
PANDORABOTS_URL=
```

You can use [ngrok](https://ngrok.com/) to tunnel HTTP requests to your localhost. Download the command line tool, and run:

```
$ ngrok http 3000
```

This will give you a public URL that will forward requests to localhost:3000. You'll need to make sure your TwiML App's Request URL is set to this.
