const ws = new WebSocket('ws://ai.tekno.icu:8080/', {
	origin: 'https://ai.tekno.icu',
});

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
