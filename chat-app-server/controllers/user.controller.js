const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret="estoessecreto";

const registerUser = (request,response) => {
    const {username,email,password} = request.body;
    if(!username||!email||!password){
        response.statusMessage = "Los campos: username, email y password son obligatorios."
        return response.status(406).end();
    }
    else{
        if(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)){
            bcrypt.hash(password,saltRounds)
                .then(passwordEncriptado => {
                    
                    User.findOne({email}).then(usuarioObtenido => {
                        if(usuarioObtenido){
                            response.statusMessage="El email utilizado ya existe en la base de datos.";
                            return response.status(406).end();
                        }
                        else{
                            const nuevoUsuario = {
                                username,email,password:passwordEncriptado
                            };
                            User.create(nuevoUsuario)
                                .then(usuarioCreado => {
                                    const payload = {
                                        username: usuarioCreado.username, email: usuarioCreado.email,_id:usuarioCreado._id
                                    }
                                    const expiracion = {
                                        expiresIn:'5m'
                                    }
                                    jwt.sign(payload, secret,expiracion,(err,token) =>{
                                        return response.status(201).json({token});
                                    });
                                })
                                .catch(err =>{
                                    response.statusMessage = "Hubo un error al intentar registrar al usuario."+err;
                                    return response.status(400).end();
                                });
                        }
                    }).catch(err =>{
                        response.statusMessage = "Hubo un error al intentar registrar al usuario."+err;
                        return response.status(400).end();
                    })
                    
                })
        }
        else{
            response.statusMessage = "El email proporcionado no es valido.";
            return response.status(406).end();
        }
    }
}

const loginUser = (request,response) => {
    const {username,password} = request.body;

    User.findOne({username})
        .then(usuarioObtenido => {
            if(usuarioObtenido){
                bcrypt.compare( password, usuarioObtenido.password )
                    .then( valido => {
                        if(valido){
                            const payload = {
                                username, email: usuarioObtenido.email, _id:usuarioObtenido._id
                            }
                            const expiracion = {
                                expiresIn:'5m'
                            }
                            jwt.sign(payload, secret,expiracion,(err,token) =>{
                                return response.status(200).json({token});
                            });
                        }
                        else{
                            response.statusMessage="Contraseña incorrecta.";
                            return response.status(404).end();
                        }
                    })

            }
            else{
                response.statusMessage = "Usuario no encontrado.";
                return response.status(404).end();
            }
        })
}


const UserController = {
    registerUser,
    loginUser
}

module.exports = UserController;