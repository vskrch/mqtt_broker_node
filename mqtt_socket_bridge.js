const app = require('http').createServer();
const io =  require('socket.io').listen(app);
app.listen(3000);
const mqtt = require('mqtt');
const  mqttClient = mqtt.connect('mqtt://127.0.0.1');
const clients = {};

io.sockets.on('connection',(socket) =>{
    socket.on('bridge-connect',(data)=>{
        if(clients[data.id] !== undefined){
            console.log('user-already-exists!');
            socket.disconnect();
        }
        else{
            clients[data.id] = {
                'socket' : socket.id,
                'topic' :  data.topic
            };

        }
        console.log(clients);
    });
    //receiving a publish message 

    socket.on('publish-message', (data)=>{

        console.log("sending: "+data.content +" to " +data.topic);
        client.publish(data.topic,data.content);
        for(var name in clients){
          console.log(name);
		  console.log(clients[name].topic);
		  console.log(data.topic);
		  console.log(clients[name].socket);
          console.log(socket.id);
          if(clients[name].topic === data.topic && clients[name].socket !== socket.id){
              console.log(clients[name].socket);
              console.log('Found topic that is matched')
              //send to subscribers.
              io.sockets.connected[clients[name].socket].emit('subscribe-message',{"content":data.content,"topic":data.topic})

          }
        }
    });
    //destroy socket connection on disconnet.
    socket.on('disconnet',()=>{
        console.log('disconnecting!');
        for(var name in clients){
            if(clients[name].socket === socket.id){
                delete clients[name];
                break;
            }
        }
    });
    const options = {
        port : 1883,
        host : 'mqtt://localhost',
        clientId : 'mqttws_bridge',
        keepalive: 60,
        reconnectPeriod:1000,
        protocolId: 'MQIsdp',
        protocolVersion:3,
        clean:true,
        encoding: 'utf8'
    };
    const client = mqtt.connect('mqtt://localhost',options)

    client.on('connect', ()=> {
       // console.log('received message %s %s',topic,message);
        console.log("MQTT to WS Sending " + message+"to"+topic);
        for(var name in clients){
            console.log(name);
            if(clients[name].topic === topic){
                console.log(clients[name].socket);
                console.log('Found matching Socket topic');

                //push to subscribers.
                io.sockets.connected[clients[name].socket].emit('subscribe-message', {"content": message,"topic": topic})

            }
        }
    })
});