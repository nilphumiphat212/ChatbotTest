const config = require('../package.json').config
const http = require('axios').default

const api = 'https://graph.facebook.com/v9.0/me/messages'

function sendMessage(recipient, message) {
    data = {
        recipient: recipient,
        message: {
            text: message
        }
    }
    http.post(`${api}?access_token=${config.vertifyToken}`, data)
    .then(() => {
        console.log('send success')
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    sendMessage
}