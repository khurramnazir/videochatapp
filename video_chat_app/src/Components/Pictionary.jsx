import React, { useEffect, useState } from "react";
import { objects } from "../utils/data";
import Whiteboard from "../Components/Whiteboard";
import useStyles from "../styling/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import Typography from '@material-ui/core/Typography';

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
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={9}>
            <Whiteboard
              connection={connection}
              pair={pair}
              roomLobby={roomLobby}
              isYourGo={isYourGo}
              />
      </Grid>
      <Grid item xs={3}>
          <img
              className="gameIcon"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/7810265.5473edf9ace35.jpg"
              alt="Pictionary"
          />


        {isYourGo ? (
          <>
              <p>Its your turn!</p> 
              <p>Please draw a...</p> 
        <Typography variant="h4" color="primary">{randomObject}</Typography>         
              
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
              {/* <p>
                When you have finished click swap player for the other person to
                take over drawing
              </p> */}
          </>
        ) : (
            <p>It's your turn to guess!</p>
        )}
      </Grid>
    </Grid>
  );
};

export default Pictionary;
