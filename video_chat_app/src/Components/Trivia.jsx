import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Radio,
  Grid,
} from "@material-ui/core";
import useStyles from "../styling/styles";

const Trivia = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [trivia, setTrivia] = useState({ question: null, answer: null });
  const [yourAnswer, setYourAnswer] = useState(null);
  const [partnerAnswer, setPartnerAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  let [points, setPoints] = useState(0);
  const { connection, pair, roomLobby } = props;
  const classes = useStyles();

  useEffect(() => {
    connection.on("recievedQuestion", (triv) => {
      setSubmitted(false);
      setTrivia(triv.results[0]);
      setGameStarted(true);
      setPartnerAnswer(null);
      setYourAnswer(null);
    });

    connection.on("recievedAnswer", (ans) => {
      ans === "true" ? setPartnerAnswer(true) : setPartnerAnswer(false);
    });
  }, [partnerAnswer, trivia, submitted, connection]);

  useEffect(() => {
    connection.on("recievedSubmitted", (isSubmitted) => {
      calcPoints();
      setSubmitted(isSubmitted);
    });
  });

  function sendAnswer(ans) {
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
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={9}>
        {gameStarted === false ? (
          <Button
            onClick={() => {
              startGame();
            }}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {" "}
            Start Game{" "}
          </Button>
        ) : (
          <>
            <p dangerouslySetInnerHTML={{ __html: trivia.question }} />

            <FormControl component="fieldset">
              <RadioGroup
                row
                value={yourAnswer}
                onChange={(e) => {
                  const answer = e.target.value;
                  sendAnswer(answer);
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="secondary" />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>

            <br />
            {yourAnswer !== null && partnerAnswer !== null && !submitted && (
              <Button
                onClick={() => {
                  submitAnswers();
                }}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            )}
            <br />
            {submitted && (
              <>
                <Typography variant="h4">
                  {" "}
                  {JSON.stringify(trivia.correct_answer)}{" "}
                </Typography>
                <Button
                  onClick={() => {
                    getTrivia();
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Next Question
                </Button>
              </>
            )}
          </>
        )}
      </Grid>
      <Grid item xs={3}>
        <>
          <img
            className="gameIcon"
            src="https://logopond.com/logos/7cbefd1c803c7e9515ea4be59233da29.png"
            alt="Trivia"
          />
          {gameStarted === true && <p> so far you have {points} points </p>}
        </>
      </Grid>
    </Grid>
  );
};

export default Trivia;
