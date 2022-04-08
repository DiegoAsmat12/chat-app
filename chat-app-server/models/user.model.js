const mongoose  = require("mongoose");

const SchemaUser = mongoose.Schema({
    username:{
        type:String,
        required:[true,"El username es requerido."]
    },
    email:{
        type:String,
        required:[true,"El email es requerido."],
        unique:[true,"El email debe ser único."],
    },
    password:{
        type:String,
        required:[true,"La contraseña es obligatoria."],
        minLength:[8,"La contraseña debe tener como mínimo 8 caracteres."]
    }
},{timestamps:true})

const User = mongoose.model('users', SchemaUser);

module.exports = User;