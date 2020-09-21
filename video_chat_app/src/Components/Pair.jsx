import React, { useState } from "react";
import CountDown from "../Components/CountDown";
import Video from "../Components/Video";
import ErrorPage from "./ErrorPage";
// import Trivia from "../Components/Trivia";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;
  console.log(props);
  let [showPartner, setShowPartner] = useState(false);
  const updateShowPartner = () => {
    setShowPartner(true);
  };

  // useEffect(() => {
  //   // if(connection !== "")
  //   connection.emit("join pair", { pair, roomLobby });

  //   connection.on("joined pair room", (message) => {
  //     console.log(message);
  //   });
  // }, []);

  return (
    <div>
      {props.location.key !== "initial" ? (
        <>
          <p>{`Welcome to ${pair} of ${roomLobby.split("=")[0]}!`}</p>
          <CountDown updateShowPartner={updateShowPartner} />
          <Video
            showPartner={showPartner}
            connection={connection}
            roomLobby={roomLobby}
            pair={pair}
          />
          {/* <Trivia /> */}
        </>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </div>
  );
};

export default Pair;
