const express = require("express");
const app = express();
require('./config/mongoose.config');
const http = require('http');
const cors = require('cors');
const socketUtils = require("./utils/socket.utils");
const UserRouter = require("./routes/user.router");

app.use(express.json())
app.use(cors());
app.use('/api/users', UserRouter);

const server = http.createServer(app);

const io = socketUtils.io(server);

socketUtils.connection(io);

server.listen(8080, () =>{
    console.log("Server is running");
})

