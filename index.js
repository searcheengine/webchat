const io = require('socket.io')(8080)

const users ={};

io.on('connection' , socket =>{
     socket.on('new-user-joined', name =>{
      
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

     });

     socket.on('send', message =>{
        socket.broadcast.emit('receive',{ message: message , name: user[socket.id]})
     });
})
