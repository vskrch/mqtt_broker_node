//subscriber.js
const ip = require('ip');
const ipAddr = ip.address();
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://'+ipAddr);
client.on('connect', function () {
    client.subscribe('NEWTOPIC')
})
client.on('message', function (topic, message) {
context = message.toString();
console.log(context)
})
