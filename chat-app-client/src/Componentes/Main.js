import { useEffect, useMemo, useState } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { io } from "socket.io-client";
import ChatRoom from "./ChatRoom/ChatRoom";
import FormularioRoom from "./FormularioRoom/FormularioRoom";
import RoomSelector from "./RoomSelector/RoomSelector";

const Main = (props) => {
    const [rooms,setRooms] = useState([]);
    
    const socket = useMemo(() => {
        if(!localStorage.token) return null
        return io.connect('http://localhost:8080',{query:{token:localStorage.token}});
    },[localStorage.token])

    useEffect(()=> {
        if(socket){
            socket.emit("get_rooms",{});

        }
        else{
            props.history.push("/login");
        }
        
        return () => {
            if(socket){
                console.log("disconnect")
                socket.disconnect();
            }
        }
    },[])

    useEffect(() => {
        if(socket){
            socket.on("auth_error", () =>{
                props.history.push("/login");
            })
            socket.on('show_rooms', data => {
                setRooms(data);
            });
            socket.on("new_room", data => {
                setRooms((prev) => [...prev,data]);
            })
        }

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
