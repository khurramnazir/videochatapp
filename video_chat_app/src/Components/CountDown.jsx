import React, { useState, useEffect } from "react";

const CountDown = ({ updateShowPartner }) => {
  let [timeLeft, setTimeLeft] = useState(10);

  const take1Second = () => {
    setTimeLeft(timeLeft - 1);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(take1Second, 1000);
    }
    if (timeLeft === 0) {
      updateShowPartner();
    }
  }, [timeLeft, take1Second, updateShowPartner]);

  return <div>{timeLeft > 0 && <p>{timeLeft}</p>}</div>;
};

export default CountDown;
