import GameCard from "../components/GameCard";
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';

const socket = io('http://localhost:3001');


const HomePage = () => {
  const [gameType, setGameType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('roomJoined', (data) => {
      setMessage(`Joined ${data.room} with a max of ${data.maxPlayers} players`);
    });

    socket.on('roomFull', (gameType) => {
      setMessage(`${gameType} is full!`);
    });

    return () => {
      socket.off('roomJoined');
      socket.off('roomFull');
    };
  }, []);

  const joinRoom = (game) => {
    setGameType(game);
    socket.emit('joinRoom', game);
  };

  const leaveRoom = (game) => {
    socket.emit('leaveRoom', game);
  };

  return (
    <div>
      <h1>Card Game Hub</h1>
      <button onClick={() => joinRoom('poker')}>Join Poker Room</button>
      <button onClick={() => joinRoom('blackjack')}>Join Blackjack Room</button>
      <button onClick={() => leaveRoom(gameType)}>Leave Room</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HomePage;
