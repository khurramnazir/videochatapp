import { makeStyles } from "@material-ui/core/styles";

import { palette } from "@material-ui/system";

//import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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

  gameBar: {
    background: "linear-gradient(45deg, #D8EAFF 30%, #BED0FF 90%)",
    color: "#3F51B5",
    border: "solid 1px #3F51B5",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: "10%",
    // marginRight: "10%",
  },
}));

export default useStyles;
