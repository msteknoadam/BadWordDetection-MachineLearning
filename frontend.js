const socket = io('https://ai.tekno.icu:8443');

socket.emit('test', 1);

window.socket = socket;
