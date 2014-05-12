/*
|------------------------------------------------------------------------------------
| Create global vars
|------------------------------------------------------------------------------------
*/
	var io, gameSocket;

/*
|------------------------------------------------------------------------------------
| This function is called by app.js to initialize a new game instance.
| 
| @param sio : The Socket.IO librabry
| @param socket : The socket object for the connected client
|------------------------------------------------------------------------------------
*/
	exports.initGame = function(sio, socket) {
		console.log('initGame');
		io = sio;
		gameSocket = socket;

		gameSocket.emit('connected', {message : 'you are connected'});
	}