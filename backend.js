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
var PORT = 3000;
var fs = require('fs');
var cert = fs.readFileSync('../socketiossl/cert.pem');
var key = fs.readFileSync('../socketiossl/key.pem');
var server = require('https').createServer({
    cert: cert,
    key: key
});
console.log("Certificate: " + cert);
console.log("Key: " + key);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('A user has connected.');
    socket.on('disconnect', function () { return console.log('A user has disconnected.'); });
    socket.on('test', function (data) { return console.log(data); });
});
server.listen(PORT, function () { return console.log("Started listening on localhost:" + PORT); });
