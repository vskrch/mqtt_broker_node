var ip = require('ip');
var mqtt = require('mqtt');
const ipAddr = ip.address();
var client = mqtt.connect('mqtt://'+ipAddr);
console.log(ip.address());

client.on('connect',function(){
    let count = 1;
    setInterval(function(){
      
        //count+=1;
        const incr = () => count=count+1;
        client.publish('NEWTOPIC','UAV-message-'+incr());
        console.log('message sent');
        if (count === 100){
            count = 0;//resetting counter after every n'th message
        }

    },100);//send message very 1 second
    
});
