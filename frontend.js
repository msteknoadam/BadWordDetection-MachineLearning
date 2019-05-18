const ws = new WebSocket('wss://ai.tekno.icu:8080/');

ws.on('open', () => {
	console.log('Connected.');
});

ws.on('open', () => {
	close.log('Disconnected.');
});

ws.on('message', data => {
	console.log('Received: %s', data);
});

window.ws = ws;
