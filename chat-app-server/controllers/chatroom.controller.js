const ChatRoom = require("../models/chatroom.model");

//SOCKETS
const createRoom = ({name},io,socket) => {
    if(!name){
        socket.emit("new_room",{error:"El mensaje debe tener más de un caracter."});
    }
    else{
        const nuevoRoom = {name};

        ChatRoom.create(nuevoRoom)
            .then(roomCreado => {
                return io.emit("new_room", roomCreado);
            })
            .catch(err =>{
                socket.emit("new_room",{error:"Hubo un error al crear el room, intente nuevamente."});
            })
    }
}

const getRooms = (socket) => {
    ChatRoom.find().sort({created_at:1})
        .then(rooms => {
            socket.emit("show_rooms", rooms);
        })
        .catch(err => {
            socket.emit("show_rooms",{error:"Hubo un error al obtener los rooms"});
        });
}


const getRoomById = ({id},socket) => {
    ChatRoom.findById({_id:id})
        .populate({path:'messages', sort:{created_at:-1},limit:100, populate:{path:'user'}})
        .then( room =>{
            socket.emit('show_room',room);
        })
        .catch( err => {
            socket.emit('show_room',{error:"Hubo un error al ingresar al room correspondiente."});
        });
}


const ChatRoomController = {
    createRoom,
    getRooms,
    getRoomById
}

module.exports = ChatRoomController;