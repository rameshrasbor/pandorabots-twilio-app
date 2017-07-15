if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const bodyParser = require('body-parser')
const twilio = require('twilio')
const redis = require('redis')
const Bot = require('pb-node')

const bot = new Bot({
  app_id: process.env.PANDORABOTS_APP_ID,
  user_key: process.env.PANDORABOTS_USER_KEY,
  botname: process.env.PANDORABOTS_BOTNAME,
  url: process.env.PANDORABOTS_URL
})

const redisClient = redis.createClient(process.env.REDISTOGO_URL)
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
//app.use(twilio.webhook([process.env.TWILIO_AUTH_TOKEN]))
app.use(twilio.webhook([process.env.TWILO_ACCOUNT_SID],[process.env.TWILIO_AUTH_TOKEN]))
app.use(function(req, res, next) {
  redisClient.get(req.body.From, function(err, clientName) {
    if (clientName) {
      req.clientName = clientName
    }
    next()
  })
})

app.post('/', function(req, res) {
  const options = { input: req.body.Body }

  if (req.clientName) {
    options.client_name = req.clientName
    bot.talk(options, onBotResponse)
  } else {
    bot.atalk(options, onBotResponse)
  }

  function onBotResponse(err, botResponse) {
    if (!req.clientName) {
      redisClient.set(req.body.From, botResponse.client_name)
    }

    const textResponse = botResponse.responses.join(' ')
    const twimlResponse = new twilio.TwimlResponse()
    twimlResponse.message(textResponse)

    res.type('text/xml')
    res.send(twimlResponse.toString())
  }
})

app.listen(process.env.PORT);
