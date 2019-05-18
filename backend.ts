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

const app = require('express')();
const fs = require('fs');
const PORT = 80;
const SPORT = 443;
const cert = fs.readFileSync('../socketiossl/cert.pem', 'utf8');
const key = fs.readFileSync('../socketiossl/key.pem', 'utf8');
var credentials = { key: key, cert: cert };
const server = require('https').createServer({
	cert: cert,
	key: key,
});
const httpServer = require('http').createServer(app);
const httpsServer = require('https').createServer(credentials, app);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.get('/frontend.js', (req, res) => {
	res.sendFile(__dirname + '/frontend.js');
});
const io = require('socket.io')(httpsServer);
io.on('connection', socket => {
	console.log('A user connected.');
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
	socket.on('test', data => {
		console.log(data);
	});
});
httpServer.listen(PORT, () => {
	console.log(`Listening HTTP on *:${PORT}`);
});
httpsServer.listen(SPORT, () => {
	console.log(`Listening HTTPS on *:${SPORT}`);
});

// VER 3 END
