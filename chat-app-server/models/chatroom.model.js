const mongoose = require("mongoose");

const SchemaChatRoom = mongoose.Schema({
    name:{
        type:String,
        required:[true, "El nombre del room es necesario para poder crearlo."],
        minLength:[3,"El nombre del room debe tener al menos 3 caracteres."]
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages'
    }]
},{timestamps:true});

const ChatRoom = mongoose.model("chatrooms",SchemaChatRoom);

module.exports = ChatRoom;