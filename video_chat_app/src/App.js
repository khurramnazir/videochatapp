import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import RoomCreator from "./Components/RoomCreator";
import Lobby from "./Components/Lobby";
import Login from "./Components/Login";
import Pair from "./Components/Pair";
// import ErrorPage from "./Components/ErrorPage";
// import io from "socket.io-client";
// import { useEffect, useRef } from "react";

const App = () => {
  //io({ transports: ["websocket"], upgrade: false });

  // const [connection, setConnection] = useState("");
  // const socketRef = useRef();

  // useEffect(() => {
  //   socketRef.current = io.connect("http://localhost:5000");
  //   setConnection(socketRef.current);
  // }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <RoomCreator path="/" />
        <Lobby path="/:roomLobby" />
        <Login path="/login/:roomLobby" />
        {/* <Pair path="/:roomLobby/:pair" /> */}

        {/* <ErrorPage default status={404} msg={"Path not found"} /> */}
      </Router>
    </div>
  );
};

export default App;
