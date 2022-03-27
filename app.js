const express = require('express');
const path = require('path');
const { instrument } = require('@socket.io/admin-ui');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3500

const socketPORT = process.env.PORT || 3700
const io = require('socket.io')(socketPORT, {
  cors: {
    origin: [PORT],
  },
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})


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



const start = async () => {
  try {
    app.listen(PORT, () => console.log('app listening'));
  } catch (error) {
    console.log(error);
  }
};

start();

instrument(io, {auth:false})
