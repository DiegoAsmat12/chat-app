import React, { useEffect, useRef } from "react";
import MessageBox from "../MessageBox/MessageBox";
import './ChatBox.css'

const ChatBox = (props) => {
    const {messages, userId} = props;

    const messageEnd = useRef(null)

    useEffect(() =>{
        messageEnd.current.scrollIntoView({behavior:'smooth'});
    },[messages])

    return(
        <div className="chat-box bg-white-transparent scroll scroll-reverse">
            {
                messages.map((message, index) => {
                    return <MessageBox message={message}  key={"message_"+index} userId={userId}/>
                })
            }
            <div ref={messageEnd}></div>
        </div>
    )
}

export default ChatBox;