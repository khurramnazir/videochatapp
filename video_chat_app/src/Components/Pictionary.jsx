import React, { useEffect, useState } from "react";
import { objects } from "../utils/data";
import Whiteboard from "../Components/Whiteboard";
import useStyles from "../styling/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

const Pictionary = (props) => {
  const [randomObject, setRandomObject] = useState(null);
  const { connection, pair, roomLobby, setIsYourGo, isYourGo } = props;

  useEffect(() => {
    isYourGo && getRandomObject();

    connection.on("receivedPlayerSwap", () => {
      setIsYourGo(!isYourGo);
    });
  });

  const classes = useStyles();

  function getRandomObject() {
    const randomIndex = Math.floor(Math.random() * objects.length);
    setRandomObject(objects[randomIndex]);
  }

  function swapPlayers() {
    setIsYourGo(!isYourGo);
    setRandomObject(null);
    connection.emit("sendPlayerSwap", { pair, roomLobby });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {isYourGo ? (
          <>
            <Grid item xs={12}>
              <p>It's your turn to draw!</p>
            </Grid>
            <Grid item xs={12}>
              <p>{`Please draw a "${randomObject}"`}</p>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <p>
                When you have finished click swap player for the other person to
                take over drawing
              </p>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  swapPlayers();
                }}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SyncAltIcon />}
              >
                Swap Players
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <p>It's your turn to guess!</p>
          </Grid>
        )}
        <Grid item xs={12}>
          <Whiteboard
            connection={connection}
            pair={pair}
            roomLobby={roomLobby}
            isYourGo={isYourGo}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Pictionary;
