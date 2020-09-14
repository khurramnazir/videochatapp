import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import RoomCreator from "./Components/RoomCreator";
import Lobby from "./Components/Lobby";
import Login from "./Components/Login";
// import ErrorPage from "./Components/ErrorPage";
import io from "socket.io-client";
import { useEffect } from "react";

const App = () => {
  io({ transports: ["websocket"], upgrade: false });

  useEffect(() => {
    io.connect("http://localhost:5000");
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <RoomCreator path="/" />
        <Lobby path="/:roomLobby" />
        <Login path="/login/:roomLobby" />
        {/* <ErrorPage default status={404} msg={"Path not found"} /> */}
      </Router>
    </div>
  );
};

export default App;
