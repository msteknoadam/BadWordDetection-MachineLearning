const socket = io();

socket.emit('test', 1);

window.socket = socket;
