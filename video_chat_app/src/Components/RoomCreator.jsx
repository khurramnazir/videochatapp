import React, { useState } from "react";
import { navigate } from "@reach/router";

const RoomCreator = () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    navigate(`/${roomName}`, {
      state: { name, type: "admin" },
    });
    // const socket = io.connect("http://localhost:5000");
  };

  return (
    <>
      <p>Welcome! Please create a room by filling in the details below...</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        ></input>
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="Room Name"
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Create Room</button>
      </form>
    </>
  );
};

export default RoomCreator;
