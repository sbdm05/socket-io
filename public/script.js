const socket = io('/');
socket.on('connect', ()=>{
    result.innerHTML = `connecté avec ID: ${socket.id}`
})

// socket.emit('custom', "texte")

const result = document.querySelector('.result');
// afficher la liste du tableau

// submit form
const btn = document.querySelector('.submit-btn');
const btnJoin = document.querySelector('.join-btn')
const input = document.querySelector('.form-input');
const inputRoom = document.querySelector('#room');
const formAlert = document.querySelector('.form-alert');

// écouter l'événement received-message
socket.on('received-message', (message) => {
  result.innerHTML += `<div>${message}</div>`;
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const message = input.value; 
  const roomValue = room.value;
  //result.innerHTML += `<div>${input.value}</div>`;
  socket.emit('message', input.value, roomValue);
  input.value = '';
  room.value = '';
});

btnJoin.addEventListener('click', (e)=>{
    e.preventDefault()
    const roomValue = room.value;
    // notifier le serveur
    socket.emit('join-room', roomValue, message=>{
        result.innerHTML += `<div>${message}</div>`
    })
})

