import React, { useEffect, useState } from "react";
import Video from "../Components/Video";
import Trivia from "../Components/Trivia";
import Pictionary from "../Components/Pictionary";
import ErrorPage from "./ErrorPage";
import GameSelector from "./GameSelector";
import {Container} from "@material-ui/core";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;

  let chatTime = 0;
  if (props.location.state) {
    chatTime = props.location.state.chatTime;
  }
  const [gameSelected, setGameSelected] = useState("All Games");
  const [isYourGo, setIsYourGo] = useState(false);

  return (
    <Container component="main" maxWidth="md">
      {props.location.key !== "initial" ? (
        <>
          <GameSelector
            setGameSelected={setGameSelected}
            gameSelected={gameSelected}
            setIsYourGo={setIsYourGo}
            connection={connection}
            pair={pair}
            roomLobby={roomLobby}
          />
          {/* <p>{`Welcome to ${pair} of ${roomLobby.split("=")[0]}!`}</p> */}
          <Video
            connection={connection}
            roomLobby={roomLobby}
            pair={pair}
            chatTime={chatTime}
          />
          {gameSelected === "Pictionary" && (
            <Pictionary
              connection={connection}
              pair={pair}
              roomLobby={roomLobby}
              setIsYourGo={setIsYourGo}
              isYourGo={isYourGo}
            />
          )}
          {gameSelected === "Trivia" && (
            <Trivia connection={connection} pair={pair} roomLobby={roomLobby} />
          )}
        </>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </Container>
  );
};

export default Pair;
