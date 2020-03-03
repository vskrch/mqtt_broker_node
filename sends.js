var io = require('socket.io-client');
const socket = io('http://localhost:3000');
var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://127.0.0.1');
mqttClient.socket.on('connect', function () {
    console.log('MQTT is connected to the server.');
    mqttClient.subscribe('#');
})

mqttClient.socket.on('message', function (topic, message) {
    // message is Buffer
    // wssClient.send(message.toString());
// unable to connet mqtt and websocket streams together .
// var socket = io.connect('http://localhost');
  socket.on('message', function (topic, content) {
    console.log(topic, content);
    socket.emit('publish-message', { "topic":"#","data": "" });
  });
});
// wssClient.on('open', function open() {
//     console.log('wssClient is open now.');
// });
socket.emit('bridge-connect', {"topic": "usertopic", "id": "ac"});

  // Send the message to the server
   socket.emit("publish-message", {"topic": "usertopic","content": "This is a test message"});
//    socket.emit("publish-message", message);