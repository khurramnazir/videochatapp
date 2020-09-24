import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import useStyles from "../styling/styles";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

const GameSelector = ({
  setGameSelected,
  gameSelected,
  setIsYourGo,
  connection,
  pair,
  roomLobby,
}) => {
  useEffect(() => {
    connection.on("receivedGame", (game) => {
      setGameSelected(game);
      setIsYourGo(false);
    });
  });

  const classes = useStyles();

  function selectGame(e) {
    // const game = e.target.id;
    const game = e;
    console.log(game);
    setGameSelected(game);
    setIsYourGo(true);
    connection.emit("sendGame", { pair, roomLobby, game });
  }

  return (
    <>
      {gameSelected === "All Games" ? (
        <>
          <p>Pick a game to play</p>
          <Button
            onClick={() => {
              selectGame("Trivia");
            }}
          >
            <img
              onClick={() => {
                selectGame("Trivia");
              }}
              className="gameIcon"
              src="https://logopond.com/logos/7cbefd1c803c7e9515ea4be59233da29.png"
              alt="Trivia"
            />
          </Button>

          <Button
            onClick={() => {
              selectGame("Pictionary");
            }}
          >
            <img
              onClick={() => {
                selectGame("Pictionary");
              }}
              className="gameIcon"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/7810265.5473edf9ace35.jpg"
              alt="Pictionary"
            />
          </Button>
        </>
      ) : (
        <Button
          disableElevation={true}
          onClick={() => {
            selectGame("All Games");
          }}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SportsEsportsIcon />}
        >
          All Games
        </Button>
      )}
    </>
  );
};
export default GameSelector;
