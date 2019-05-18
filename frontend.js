const socket = io('https://ai.tekno.icu:3000');

socket.emit('test', 1);

window.socket = socket;
