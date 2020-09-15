import React, {} from "react";
import PairVideo from "../Components/PairVideo";
import CountDown from "../Components/CountDown";

const Pair = (props) => {
  const { roomLobby, pair } = props;
  return (
    //validate users of correct type
    <div>
      <p>{`Welcome to ${pair} of ${roomLobby}!`}</p>
      <CountDown />
      <PairVideo />
    </div>
  );
};

export default Pair;
