const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// create room
let rooms = {
  poker: [],
  blackjack: []
};

// setting
const MAX_PLAYERS_POKER = 10;
const MAX_PLAYERS_BLACKJACK = 4;

io.on('connection', (socket) => {
  console.log('New player connected: ' + socket.id);

  // join room
  socket.on('joinRoom', (gameType) => {
    if (gameType === 'poker' && rooms.poker.length < MAX_PLAYERS_POKER) {
      rooms.poker.push(socket.id);
      socket.join('poker');
      socket.emit('roomJoined', { room: 'poker', maxPlayers: MAX_PLAYERS_POKER });
    } else if (gameType === 'blackjack' && rooms.blackjack.length < MAX_PLAYERS_BLACKJACK) {
      rooms.blackjack.push(socket.id);
      socket.join('blackjack');
      socket.emit('roomJoined', { room: 'blackjack', maxPlayers: MAX_PLAYERS_BLACKJACK });
    } else {
      socket.emit('roomFull', gameType);
    }
  });

  // leave room
  socket.on('leaveRoom', (gameType) => {
    if (gameType === 'poker') {
      rooms.poker = rooms.poker.filter(player => player !== socket.id);
      socket.leave('poker');
    } else if (gameType === 'blackjack') {
      rooms.blackjack = rooms.blackjack.filter(player => player !== socket.id);
      socket.leave('blackjack');
    }
  });

  // disconnect 
  socket.on('disconnect', () => {
    console.log('Player disconnected: ' + socket.id);
    // remove player when leave room
    rooms.poker = rooms.poker.filter(player => player !== socket.id);
    rooms.blackjack = rooms.blackjack.filter(player => player !== socket.id);
  });
});

// run server
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
