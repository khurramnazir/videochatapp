import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

const CountDown = ({ chatTime, roomLobby, myInfo }) => {
  let [timeLeft, setTimeLeft] = useState(chatTime / 1000);

  const take1Second = () => {
    setTimeLeft(timeLeft - 1);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(take1Second, 1000);
    }
    if (timeLeft === 0) {
      navigate("/" + roomLobby, { state: { myInfo } });
    }
  });

  return <div>{timeLeft > 0 && <p>{timeLeft}</p>}</div>;
};

export default CountDown;
