var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req , res) => {
	res.send("hello there");
});

io.on('connection' , (socket) => {
	socket.on('disconnect',() => {

	});

	socket.on('set-name' , (name) => {
		socket.nickname =  name;
		console.log(socket.nickname +' added to chat');
	});

	socket.on('add-message' , (message) => {
		io.emit('message' , {text : message , nickname : socket.nickname , time : new Date() });
	});


});
	var PORT = process.env.PORT || 3001;
	http.listen(PORT , () => {
		console.log('POST is listening on '+PORT);
	});