import React, { useState, useEffect } from "react";
import * as api from "../utils/api";

const Trivia = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [trivia, setTrivia] = useState({ question: null, answer: null });
  const [yourAnswer, setYourAnswer] = useState(null);
  const [partnerAnswer, setPartnerAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  let [points, setPoints] = useState(0);
  const { connection, pair, roomLobby } = props;

  useEffect(() => {
    connection.on("recievedQuestion", (triv) => {
      setSubmitted(false);
      setTrivia(triv.results[0]);
      setGameStarted(true);
      setPartnerAnswer(null);
      setYourAnswer(null);
    });

    connection.on("recievedSubmitted", (isSubmitted) => {
      calcPoints();
      setSubmitted(isSubmitted);
    });

    connection.on("recievedAnswer", (ans) => {
      ans === "true" ? setPartnerAnswer(true) : setPartnerAnswer(false);
    });
  }, [partnerAnswer, trivia, submitted]);

  function sendAnswer(e) {
    const ans = e.target.value;
    ans === "true" ? setYourAnswer(true) : setYourAnswer(false);
    connection.emit("sendAns", { pair, roomLobby, ans });
  }

  function getTrivia() {
    api.fetchTrivia().then((triv) => {
      setSubmitted(false);
      setTrivia(triv.results[0]);
      connection.emit("sendQuestion", { pair, roomLobby, triv });
      setPartnerAnswer(null);
      setYourAnswer(null);
    });
  }

  function startGame() {
    setGameStarted(true);
    getTrivia();
  }

  function submitAnswers() {
    calcPoints();
    setSubmitted(true);
    connection.emit("ansSubmitted", { pair, roomLobby, isSubmitted: true });
  }

  function calcPoints() {
    let count = 0;
    yourAnswer === trivia.correct_answer && count++;
    partnerAnswer === trivia.correct_answer && count++;
    setPoints(points + count);
  }

  return (
    <>
      <h2> Trivia Game </h2>
      {gameStarted === false ? (
        <button onClick={startGame} value={startGame}>
          {" "}
          Start Game{" "}
        </button>
      ) : (
        <>
          <p> so far you have {points} points </p>
          {console.log(trivia)}
          <p> {trivia.question} </p>
          <button onClick={sendAnswer} value={true}>
            {" "}
            True{" "}
          </button>
          <button onClick={sendAnswer} value={false}>
            {" "}
            False{" "}
          </button>
          <br />
          {yourAnswer !== null && partnerAnswer !== null && !submitted && (
            <button onClick={submitAnswers}> Submit </button>
          )}
          <br />
          {submitted && (
            <>
              <p> {JSON.stringify(trivia.correct_answer)} </p>
              <button onClick={getTrivia}> Next Question </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Trivia;
