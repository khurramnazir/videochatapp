import React from "react";
import { navigate } from "@reach/router";
import { Button, Container, Typography } from "@material-ui/core";
import useStyles from "../styling/styles";

const Homepage = () => {
  const classes = useStyles();

  const getStarted = () => {
    navigate("/createroom");
  };

  return (
    <Container className={classes.container}>
      <div className={classes.background}>
        <div className={classes.text}>
          <Typography component="h1" variant="h5">
            Welcome to PearUp, click below to get started
          </Typography>
        </div>
        <div className={classes.homepage}>
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
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
