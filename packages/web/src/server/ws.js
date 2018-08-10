import WebSocket from 'ws';
import { connection } from './api/services/composer';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connect(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');

  connection.on('event', (event) => {
    console.log(event);
    ws.send(event.toString());
  });
});

export default wss;
