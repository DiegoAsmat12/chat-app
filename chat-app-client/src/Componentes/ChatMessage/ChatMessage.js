import React, { useEffect, useRef, useState } from "react";
import './ChatMessage.css'
const ChatMessage = (props) =>{

    const {message,setMessage} = props;

    const messageInput = useRef(null);

    const growInput = (e,parentQuery) =>{
        let target = e.target;
        let parent = target.closest(parentQuery);
        target.style.height=0
        target.style.height=target.scrollHeight+'px';
        parent.style.height=0
        parent.style.height=target.scrollHeight+'px';
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return(
        <form className="flex-row" onSubmit={(e) => e.preventDefault()}>
            <div className="input_container">
                <textarea rows="1" className="input-box" placeholder="Coloque mensaje aquí" id="input_message" name="input_message" onInput={(e) => 
                    growInput(e,'.flex-row')} value={message} onChange={handleChange} onKeyDown={e => { 
                        if(e.key==='Enter' && !e.shiftKey){
                            e.preventDefault();
                            messageInput.current.click();
                        }
                    }}></textarea>
            </div>
            <button type="submit" className="btn btn-blue self-end" onClick={props.sendMessage} ref={messageInput}>Enviar</button>
        </form>
    )

}

export default ChatMessage;
