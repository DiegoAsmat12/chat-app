const mongoose = require('mongoose');

const SchemaMessage = mongoose.Schema({
    message:{
        type:String,
        required:[true,"El mensaje debe existir."],
    },
    chatRoom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatrooms'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

const Message = mongoose.model("messages",SchemaMessage);

module.exports=Message;