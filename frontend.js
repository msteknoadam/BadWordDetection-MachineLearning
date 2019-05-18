const ws = new WebSocket('wss://ai.tekno.icu:8080/');

ws.onopen = () => {
	console.log('Connected.');
});

ws.onclose = () => {
	close.log('Disconnected.');
});

ws.onmessage = data => {
	console.log('Received: %s', data);
});

window.ws = ws;
