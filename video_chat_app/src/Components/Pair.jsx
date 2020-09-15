import React from "react";
import PairVideo from "../Components/PairVideo";

const Pair = (props) => {
  const { roomLobby, pair } = props;
  return (
    //validate users of correct type
    <div>
      <p>{`Welcome to ${pair} of ${roomLobby}!`}</p>
      <PairVideo />
    </div>
  );
};

export default Pair;
