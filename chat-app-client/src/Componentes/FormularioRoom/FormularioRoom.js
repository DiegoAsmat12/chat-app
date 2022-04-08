import React, { useState } from "react";

const FormularioRoom = (props) => {

    const {socket} = props;
    const [name,setName] = useState("");

    const createRoom = () =>{
        if(name.length>2){
            socket.emit("create_room",{name});
            props.history.push("/");
        }
    }


    return(
        <div className="flex-center bg-white-transparent">
            <div className="flex-column">
                <h1 className="text-header text-center">Crear Nuevo Chat Room</h1>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-input" id="name" name="name"/>
                </div>
                {
                    (name.length>2) ? <button onClick={createRoom} className="btn btn-blue">Crear Room</button> : <button className="btn btn-disabled">Deshabilitado</button> 
                }
            </div>
        </div>
    )
}

export default FormularioRoom;