const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// สร้างห้องและจำนวนผู้เล่น
let rooms = {
  poker: [],
  blackjack: []
};

// ตั้งค่าห้องเล่นเกม
const MAX_PLAYERS_POKER = 10;
const MAX_PLAYERS_BLACKJACK = 4;

io.on('connection', (socket) => {
  console.log('New player connected: ' + socket.id);

  // เข้าร่วมห้อง
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

  // ออกจากห้อง
  socket.on('leaveRoom', (gameType) => {
    if (gameType === 'poker') {
      rooms.poker = rooms.poker.filter(player => player !== socket.id);
      socket.leave('poker');
    } else if (gameType === 'blackjack') {
      rooms.blackjack = rooms.blackjack.filter(player => player !== socket.id);
      socket.leave('blackjack');
    }
  });

  // เมื่อผู้เล่นออกจากห้อง
  socket.on('disconnect', () => {
    console.log('Player disconnected: ' + socket.id);
    // ลบผู้เล่นออกจากห้อง
    rooms.poker = rooms.poker.filter(player => player !== socket.id);
    rooms.blackjack = rooms.blackjack.filter(player => player !== socket.id);
  });
});

// เริ่มต้นเซิร์ฟเวอร์
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
