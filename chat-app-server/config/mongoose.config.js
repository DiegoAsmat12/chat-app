const mongoose = require("mongoose");

mongoose.connect( 'mongodb://localhost/chat_app_db', {useNewUrlParser:true} )
    .then(() => console.log("Base de datos conectada."))
    .catch(err => console.log("No se pudo establecer la conexión con la Base de datos"));

mongoose.connection.on('error', err => {
    console.log('Mongoose error: '+err);
    process.exit();
});


mongoose.connection.on('disconnected', () => {
    console.log('Se cerro la conexión con la Base de datos.');
})