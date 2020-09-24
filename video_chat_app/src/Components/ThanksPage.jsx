import React from "react";
import { Link, Typography } from "@material-ui/core";

import useStyles from "../styling/styles";

const ThanksPage = (props) => {
  const classes = useStyles();
  return (
    <div>
      {`Thanks ${props.location.state.name} for using VIDEOCHAT, if you would like to start your own chat click below`}
      <Typography className={classes.root}>
        <Link href="/">GET STARTED</Link>
      </Typography>
    </div>
  );
};

export default ThanksPage;
