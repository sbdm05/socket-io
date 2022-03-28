const express = require('express');
const path = require('path');
const { instrument } = require('@socket.io/admin-ui');
require('dotenv').config();
const app = express();
const INDEX = '/public/index.html';

const PORT = process.env.PORT || 3500

// const socketPORT = process.env.PORT || 3700

// const io = require('socket.io')(PORT, {
//   cors: {
//     origin: [PORT],
//   },
// });
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);

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





instrument(io, {auth:false})
