const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

app.use(express.static(__dirname)); 
const users = {};

io.on('connection', socket => {
    console.log('New connection established');
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(`${name} joined the chat`);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(`Message from ${users[socket.id]}: ${message}`);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} has left`);
        delete users[socket.id];
    });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

