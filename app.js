const express = require('express');
const { instrument } = require('@socket.io/admin-ui');
require('dotenv').config();
const PORT = process.env.PORT || 3500
const io = require('socket.io')(PORT, {
  cors: {
    origin: ['https://socket-io-demo-tchat.herokuapp.com/'],
  },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./formulaire'));

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('message', (string, room) => {
    if (room === '') {
      socket.broadcast.emit('received-message', string);
    } else {
      socket.to(room).emit('received-message', string);
    }
    console.log(string);
  });
  socket.on('join-room', (room, callback) => {
    socket.join(room);
    callback(`Connexion réussie avec ${room}`);
  });
});

instrument(io, {auth:false})
