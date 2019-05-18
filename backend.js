// import * as tf from '@tensorflow/tfjs-node';
// const app = require('express')();
// const http = require('http').Server(app);
// const PORT = 3000;
// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html');
// });
// app.get('/frontend.js', (req, res) => {
// 	res.sendFile(__dirname + '/frontend.js');
// });
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
// model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
// const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8], [8, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7, 9, 11, 13, 15], [8, 1]);
// xs.print();
// ys.print();
// model.fit(xs, ys, { epochs: 10 }).then(() => {
// 	let prediction = model
// 		.predict(tf.tensor2d([5], [1, 1]))
// 		.toString()
// 		.slice(11);
// 	if (prediction.charAt(prediction.length - 2) === ',') {
// 		console.log('Hey');
// 		prediction = `${prediction.substr(0, prediction.length - 2)}${prediction.substr(
// 			prediction.length - 1,
// 			prediction.length
// 		)}`;
// 	}
// 	console.log(JSON.parse(prediction));
// 	const io = require('socket.io')(http);
// 	io.on('connection', socket => {
// 		console.log('A user connected.');
// 		socket.on('disconnect', () => {
// 			console.log('A user disconnected');
// 		});
// 		socket.on('test', data => {
// 			console.log(data);
// 		});
// 	});
// 	http.listen(PORT, () => {
// 		console.log(`Listening on *:${PORT}`);
// 	});
// });
// VER 1 END
// const PORT = 3000;
// const fs = require('fs');
// const cert = fs.readFileSync('../socketiossl/cert.pem');
// const key = fs.readFileSync('../socketiossl/key.pem');
// const server = require('https').createServer({
// 	cert: cert,
// 	key: key,
// });
// // console.log(`Certificate: ${cert}`);
// // console.log(`Key: ${key}`);
// const io = require('socket.io')(server);
// io.on('connection', socket => {
// 	console.log('A user has connected.');
// 	socket.on('disconnect', () => console.log('A user has disconnected.'));
// 	socket.on('test', data => console.log(data));
// });
// server.listen(PORT, () => console.log(`Started listening on localhost:${PORT}`));
// VER 2 END
var app = require('express')();
var fs = require('fs');
var PORT = 8080;
var SPORT = 8443;
var cert = fs.readFileSync('../socketiossl/cert.pem', 'utf8');
var key = fs.readFileSync('../socketiossl/key.pem', 'utf8');
var credentials = { key: key, cert: cert };
var server = require('https').createServer({
    cert: cert,
    key: key
});
var httpServer = require('http').createServer(app);
var httpsServer = require('https').createServer(credentials, app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/frontend.js', function (req, res) {
    res.sendFile(__dirname + '/frontend.js');
});
var io = require('socket.io')(httpsServer);
io.on('connection', function (socket) {
    console.log('A user connected.');
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    socket.on('test', function (data) {
        console.log(data);
    });
});
httpServer.listen(PORT, function () {
    console.log("Listening HTTP on *:" + PORT);
});
httpsServer.listen(SPORT, function () {
    console.log("Listening HTTPS on *:" + SPORT);
});
// VER 3 END
