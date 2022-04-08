import { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { io } from "socket.io-client";
import ChatRoom from "./ChatRoom/ChatRoom";
import FormularioRoom from "./FormularioRoom/FormularioRoom";
import RoomSelector from "./RoomSelector/RoomSelector";

const {token} = localStorage;

const socket = io('http://localhost:8080',{query:{token}});

const Main = (props) => {
    const [rooms,setRooms] = useState([]);
    
    useEffect(()=> {
        socket.emit("get_rooms",{});
        
        return () => {
            console.log("disconnect")
            socket.disconnect();
        }
    },[])

    useEffect(() => {
        socket.on("auth_error", () =>{
            props.history.push("/login");
        })
        socket.on('show_rooms', data => {
            setRooms(data);
        });
        socket.on("new_room", data => {
            setRooms((prev) => [...prev,data]);
        })

    },[socket])

    

    return (
        <>
            <RoomSelector rooms={rooms} setRooms={setRooms}/>
            <Switch>
                <Route exact path={"/room/crear"} render={(routerProps) => <FormularioRoom socket={socket} {...routerProps} rooms={rooms} setRooms={setRooms}/>}/>
                <Route path={"/:id"} render={routerProps => <ChatRoom socket={socket} {...routerProps} setRooms={setRooms}/>} />
            </Switch>
        </>
    )
}

export default Main;