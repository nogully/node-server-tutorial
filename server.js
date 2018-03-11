const http = require("http");
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'louisa', 'message': 'so much squirreliness!' },
  { 'id': 2, 'user': 'robbie', 'message': 'hi' },
  { 'id': 3, 'user': 'offred', 'message': 'nolite te bastardes carborundorum' }
];

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

const getAllMessages = (resp) => {
  resp.writeHead(200, { 'Content-Type': 'text/plain' });
  resp.write(JSON.stringify(messages));
  resp.end();
}

const addMessage = (newMessage, resp) => {
  resp.writeHead(201, { 'Content-Type': 'text/plain' });
  messages.push(newMessage)
  resp.write(JSON.stringify(messages));
  resp.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 
      'id': 4,  
      'user': 'nora', 
      'message': 'per aspera ad astra'
    };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});