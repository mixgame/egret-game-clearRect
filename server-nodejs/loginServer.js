var http = require("http");
var crypto = require('crypto');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    console.log();
    //var token = "";
    //var str = "";
    //str += "token="+token+"&";
    //var time = new Date().getTime();
    //str += "time="+time+"&";
    //str += "appId=90026&";
    //str += "sign=";
    //
    //var sign = "";
    //sign += "token"+token;
    //sign += "time" +time;
    //sign += "appId=90026";
    //sign += "ku4aJxfftAWAGheHtukK5";
    //console.log("post:::",str);
    //
    //crypto.createHash('md5').update(sign).digest('hex').toUpperCase();
}).listen(8888);

console.log('server running');