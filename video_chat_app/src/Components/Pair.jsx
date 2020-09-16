import React, { useState, useEffect } from "react";
import PairVideo from "../Components/PairVideo";
import CountDown from "../Components/CountDown";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;

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
    //validate users of correct type
    <div>
      <p>{`Welcome to ${pair} of ${roomLobby}!`}</p>
      <CountDown updateShowPartner={updateShowPartner} />
      <PairVideo
        showPartner={showPartner}
        connection={connection}
        roomLobby={roomLobby}
        pair={pair}
      />
    </div>
  );
};

export default Pair;
