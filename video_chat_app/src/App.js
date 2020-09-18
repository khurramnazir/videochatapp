import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import RoomCreator from "./Components/RoomCreator";
import Lobby from "./Components/Lobby";
import Login from "./Components/Login";
import Pair from "./Components/Pair";
import Trivia from "./Components/Trivia"; // this should go in the 'pair' component
// import ErrorPage from "./Components/ErrorPage";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

const App = () => {
  //io({ transports: ["websocket"], upgrade: false });

  const [connection, setConnection] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");
    setConnection(socketRef.current);
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <RoomCreator path="/" />
        <Lobby path="/:roomLobby" connection={connection} />
        <Login path="/login/:roomLobby" />
        <Pair path="/:roomLobby/:pair" connection={connection} />

        {/* <ErrorPage default status={404} msg={"Path not found"} /> */}
      </Router>
      <Trivia /> {/* this should go in the 'pair' component*/}
    </div>
  );
};

export default App;
