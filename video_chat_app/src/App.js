import React, { useState } from "react";
import "./App.css";
import "fontsource-roboto";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import RoomCreator from "./Components/RoomCreator";
import Lobby from "./Components/Lobby";
import Login from "./Components/Login";
import Pair from "./Components/Pair";
import NavBar from "./Components/NavBar";
import ErrorPage from "./Components/ErrorPage";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import ThanksPage from "./Components/ThanksPage";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";

const App = () => {
  //io({ transports: ["websocket"], upgrade: false });

  const [connection, setConnection] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");
    setConnection(socketRef.current);
  }, []);

  return (
    <>
      <NavBar />
      <div className="App">
        <Router>
          <Homepage path="/" />
          <RoomCreator path="/createroom" />
          <Lobby path="/:roomLobby" connection={connection} />
          <ThanksPage path="/:roomLobby/thanks" connection={connection} />
          <Login path="/login/:roomLobby" connection={connection} />
          <Pair path="/:roomLobby/:pair" connection={connection} />
          <ErrorPage default status={404} msg={"Path not found"} />
        </Router>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default App;

//"postinstall": "npm run build" for APP
// "postinstall": "cd ./video_chat_app && npm i"
