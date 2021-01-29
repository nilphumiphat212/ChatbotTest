const express = require('express')
const bodyParser = require('body-parser')
const server = express().use(bodyParser.json())


const config = require("./package.json").config

const webhook = require('./services/webhookService').webhookHandle


const port = process.env.PORT || config.port


server.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = config.vertifyToken
    
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    if (mode && token) {
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {

        res.sendStatus(403);      
      }
    } else {
        res.sendStatus(403)
    }
})

server.post('/webhook', (req, res) => {
    let body = req.body

    if (body.object === 'page') {
        body.entry.forEach((entry) => {

        })
    }
})

server.get('/', (req, res) => {
    res.send({
        status: 200, message: '.....'
    })
})

server.listen(port, () => {
    console.log(config.serverRunningMessage)
})