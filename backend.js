"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-node");
var app = require('express')();
var http = require('http').Server(app);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/frontend.js', function (req, res) {
    res.sendFile(__dirname + '/frontend.js');
});
var model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
var xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8], [8, 1]);
var ys = tf.tensor2d([1, 3, 5, 7, 9, 11, 13, 15], [8, 1]);
xs.print();
ys.print();
model.fit(xs, ys, { epochs: 10 }).then(function () {
    var prediction = model
        .predict(tf.tensor2d([5], [1, 1]))
        .toString()
        .slice(11);
    if (prediction.charAt(prediction.length - 2) === ',') {
        console.log('Hey');
        prediction = "" + prediction.substr(0, prediction.length - 2) + prediction.substr(prediction.length - 1, prediction.length);
    }
    console.log(JSON.parse(prediction));
    var io = require('socket.io')(http);
    io.on('connection', function (socket) {
        console.log('A user connected.');
        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    });
    http.listen(3000, function () {
        console.log('Listening on *:3000');
    });
});
