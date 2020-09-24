import { makeStyles } from "@material-ui/core/styles";
//import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  navBarTitle: {
    fontFamily: "Gochi Hand",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    // color: theme.palette.getContrastText(deepPurple[500]),
    // backgroundColor: deepPurple[500],
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    margin: theme.spacing(3),
  },

  root: {
    flexGrow: 1,
    // width: 250,
  },

  chatTimeGrid: {
    padding: 30,
  },

  cardRootLobby: {
    minWidth: 250,
    marginTop: 10,
  },

  cardRootHome: {
    minWidth: 250,
    marginTop: 100,
  },
  background: {
    backgroundImage: `url(${"https://images.unsplash.com/photo-1596748925247-cbb6c6785261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
  },
  homepage: {
    padding: "10",
  },
  text: {
    padding: "100",
  },
  container: {
    heigth: "100vh",
  },
}));

export default useStyles;
