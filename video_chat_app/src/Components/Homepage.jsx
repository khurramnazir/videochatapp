import React from "react";
import { navigate } from "@reach/router";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import useStyles from "../styling/styles";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Homepage = () => {
  const classes = useStyles();

  const getStarted = () => {
    navigate("/createroom");
  };

  return (
    <Grid container className={classes.rootHome}>
      <Grid item xs={3}>
        <h1 className={classes.pear}>🍐</h1>
      </Grid>
      <Grid item xs={9}>
        <h1 className={classes.titleFont}>Welcome to Pair Up!</h1>
        <h2 className={classes.introText}>
          A video chat app that randomly pairs you up with another team member
        </h2>
        <h3 className={classes.introText}>
          Play a game, have a chat, get to know each other...Pair Up!
        </h3>

        <Button
          onClick={() => {
            getStarted();
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
    // </Container>
  );
};

export default Homepage;
