import React, { useEffect, useState } from "react";
import ChatBox from "../ChatBox/ChatBox";
import ChatMessage from "../ChatMessage/ChatMessage";
import './ChatRoom.css';


const ChatRoom = (props) => {
    const {id} = props.match.params;
    const {socket} = props;
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(() => {
        socket.emit("join_room", {id});
    },[id])

    useEffect(() => {
        socket.on("show_room",data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setMessages(data.messages);
            }
        });
        socket.on("receive_message",(data) => {
            if(data.error) {
                console.log(data.error);
            }
            else{
                setMessage("");
                addMessage(data);
            }
        });

        socket.on("retrieve_user", data => {
            setUserId(data._id);
        })

        return () => {
            setMessage("");
            socket.off('show_room');
        }
    },[socket])

    const addMessage = (message) => {
        setMessages(prev => [...prev,message])
    }


    const sendMessage = () => {
        socket.emit("send_message",{id,message});
    }

    return (
        <div className="chat-room">
            <ChatBox messages={messages} userId={userId}/>
            <ChatMessage message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}

export default ChatRoom;

