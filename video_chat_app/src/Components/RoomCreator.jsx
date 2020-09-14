import React, {useState} from 'react';
import { navigate } from "@reach/router";


const RoomCreator = () => {
    const [name, setName] = useState("");
    const [roomName, setRoomName] = useState("");

    console.log(name, roomName)

    return (
        <>
           <p>Welcome! Please create a room by filling in the details below...</p> 
           <form onsubmit={navigate(`/${roomName}`)}>
               <input type="text" id="name" name="name" placeholder="Your Name" onChange={(e)=>{setName(e.target.value)}} ></input>
               <input type="text" id="roomName" name="roomName" placeholder="Room Name" onChange={(e)=>{setRoomName(e.target.value)}} ></input>
               <button type="submit" >Create Room</button>
           </form>
        </>
    );
};

export default RoomCreator;