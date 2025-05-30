const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map(); // id -> ws

wss.on('connection', (ws) => {
  let clientId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'register') {
        clientId = data.id;
        clients.set(clientId, ws);
        broadcastClients();
        console.log(`Client registered: ${clientId}`);
      } else if (data.type === 'message' && data.to && clients.has(data.to)) {
        console.log(`Forwarding message from ${clientId} to ${data.to}:`, data.payload);
        const targetWs = clients.get(data.to);
        if (targetWs.readyState === WebSocket.OPEN) {
          targetWs.send(JSON.stringify(data.payload));
          console.log(`Message sent successfully to ${data.to}`);
        } else {
          console.log(`Target client ${data.to} is not connected (readyState: ${targetWs.readyState})`);
        }
      } else {
        console.log(`Unhandled message type or target not found:`, data);
      }
    } catch (err) {
      console.error('Invalid message:', message, err);
    }
  });

  ws.on('close', () => {
    if (clientId) {
      clients.delete(clientId);
      broadcastClients();
      console.log(`Client disconnected: ${clientId}`);
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

function broadcastClients() {
  const clientIds = Array.from(clients.keys());
  clients.forEach((clientWs, id) => {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'clients', clients: clientIds }));
    }
  });
}

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});

