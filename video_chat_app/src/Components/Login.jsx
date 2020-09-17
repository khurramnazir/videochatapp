import React, { useState } from "react";
import { navigate } from "@reach/router";

const Login = (props) => {
  const [name, setName] = useState("");
  const { roomLobby } = props;
  const { origin } = props.location;

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    navigate(`${origin}/${roomLobby}`, {
      state: { name, type: "user" },
    });
    // const socket = io.connect("http://localhost:5000");
  };

  return (
    <>
      <p>Welcome! Please enter your username to join the lobby</p>
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
        <button type="submit">Join Lobby</button>
      </form>
    </>
  );
};

export default Login;
