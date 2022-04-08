import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './RoomSelector.css'
/**
 * 
 * @param {Array} rooms 
 * @param {*} filterValue 
 * @returns 
 */
const filterRooms = (rooms,filterValue)  => {
    
    if(!filterValue){
        return rooms;
    }
    return rooms.filter(room => {
        return room.name.toLowerCase().includes(filterValue.toLowerCase());
    });
}

const RoomSelector = (props) => {
    const [filterString,setFilterString] = useState('');
    const {rooms} = props;
    
    const filteredRooms = filterRooms(rooms,filterString);

    return(
        <aside className='roomCard'>
            <div className='roomCard__header'>
                <div className='form-group'>
                    <input type={"text"} className='form-input' value={filterString} onChange={(e) => setFilterString(e.target.value)} id="room-filter" placeholder='Buscar Chat-Room'/>
                </div>
            </div>
            <div className='roomCard__body scroll'>
                {
                    filteredRooms.map((room,index) => <NavLink key={'room_'+index} className='btn btn-select' activeClassName='active' to={"/"+room._id}>{room.name}</NavLink>)
                }
            </div>
            <NavLink className={"btn btn-select btn-blue"} activeClassName='active' to={"/room/crear"}>+ Nuevo Room</NavLink>
        </aside>
    )
}

export default RoomSelector;