const ws = new WebSocket(`ws${localStorage.getItem('production') ? '' : 's'}://ai.tekno.icu:8080/`);

ws.onopen = () => {
	console.log('Connected.');
};

ws.onclose = () => {
	console.log('Disconnected.');
};

ws.onmessage = data => {
	console.log('Received: %s', data);
};

window.ws = ws;
