const Message = require('../models/message.model');
const ChatRoom = require('../models/chatroom.model');

const sendMessage = ({id,message},io,socket) =>{
    if(!message || !id){
        socket.emit("receive_message",{error:"El mensaje debe tener más de un caracter y debe pertenecer a un ChatRoom."});
    }
    else{
        ChatRoom.findById({_id:id})
            .then( roomEncontrado => {
                if(!roomEncontrado){
                    socket.emit("receive_message", {error:"El room al que desea enviar el mensaje NO EXISTE."});
                }
                else{
                const nuevoMensaje = {message, chatRoom:id,user:socket.decoded._id};
                Message.create(nuevoMensaje)
                    .then(mensajeEnviado => {
                        ChatRoom.findByIdAndUpdate({_id:id}, {$push:{messages:mensajeEnviado._id}})
                            .then(() => {
                                Message.findById({_id:mensajeEnviado._id})
                                    .populate({path:'user'})
                                    .then(mensajeEncontrado => {
                                        io.to(id).emit("receive_message", mensajeEncontrado); 
                                    })
                                    .catch(err => {
                                        socket.emit("receive_message", {error:"Hubo un error al enviar el mensaje, intente denuevo."});
                                    });
                            })
                    })
                    .catch(err => {
                        socket.emit("receive_message", {error:"Hubo un error al enviar el mensaje, intente denuevo."});
                    });
                }
            })
            .catch(err => {
                socket.emit("receive_message",{error: "Hubo un error al intentar encontrar el room."})
            })
        
    }
}

const getMessages = (socket) => {
    Message.find().sort({created_at:-1}).limit(100)
        .then(mensajes => {
            socket.emit("show_messages", mensajes); 
        })
        .catch(err =>{
            socket.emit("show_messages",{error:"Hubo un error al obtener los mensajes."});
        });
}

const MessageController = {
    sendMessage,
    getMessages
}

module.exports = MessageController;