import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Damion",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Typography variant="h2" className={classes.title}>
      Pair Up!
    </Typography>
  );
};

export default Header;
