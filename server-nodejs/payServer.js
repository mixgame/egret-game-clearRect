var http = require("http");

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end('mix pay\n');
}).listen(6868);

console.log('pay server running');