const socket = io('http://ai.tekno.icu/BadWordDetection-MachineLearning:3000');

socket.emit('test', 1);

window.socket = socket;
