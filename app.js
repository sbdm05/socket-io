const express = require('express');
const app = express();
const cors = require('cors')
const { instrument } = require('@socket.io/admin-ui');
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.port || 3000
// const io = require('socket.io')(PORT, {
//   cors: {
//     origin: ['http://localhost:3000/'],
//   },
// });


app.use(express.json());
app.use(cors())
app.use(express.static('./public'));

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

// const port = process.env.PORT || 3700;

const start = async () => {
  try {
    //await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () => console.log('app listening'));
  } catch (error) {
    console.log(error);
  }
};

start();

instrument(io, {auth:false})
