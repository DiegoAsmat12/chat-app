const ChatRoomController = require('../controllers/chatroom.controller');
const MessageController = require('../controllers/message.controller');
const jwt = require('jsonwebtoken');
const secret="estoessecreto";
const io = server => {
    return require('socket.io')(server, {
        cors:{
            origin:"*"
        }
    })
}


const connection =io => {
    io.on("connection", socket => {
        console.log(`User connected: ${socket.id}`);
        
        socket.use(([event,...args],next) => {
            console.log(event)
            if(socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, secret, (err,decoded) =>{
                    if(err) return next( new Error('Authentication error') );
                    socket.decoded = decoded;
                    next();
                })
            }
            else{
                next(new Error('Authentication error'))
            }
        
        });

        socket.on("join_room", (data) => {
            try{
                socket.emit("retrieve_user", socket.decoded);
                socket.join(data.id);
                ChatRoomController.getRoomById(data,socket);
            }
            catch(err) {
                console.log(err);
            }
        });

        socket.on("leave_room", (data => {
            socket.leave(data.id);
        }))

        socket.on('get_rooms',() => {
            ChatRoomController.getRooms(socket);
        })

        socket.on("send_message", (data) => {
            MessageController.sendMessage(data,io,socket)
        });

        socket.on("create_room", (data) => {
            ChatRoomController.createRoom(data,io,socket)
        });

        
        socket.on("error", (err) => {
            if (err && err.message === "Authentication error") {
                socket.emit("auth_error", err);
            }
        });

        socket.on("disconnect", ()=> {
            console.log(`User disconnected ${socket.id}`)
        });
    });
}


const socketUtils = {
    io,
    connection
}

module.exports=socketUtils;