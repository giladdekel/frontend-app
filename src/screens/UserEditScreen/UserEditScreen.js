import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "./../../actions/userActions";

import { USER_UPDATE_RESET } from "./../../constants/userConstants";

import { CircularProgress, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/Edit";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserEditScreen(props) {
  const classes = useStyles();
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (event) => {
    setIsAdmin(event.target.checked);
    console.log("event.target:", event.target.checked);
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));

  };
  return (
    <div>
      <form className="form">
        <div></div>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit User: {name}
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    type="text"
                    autoFocus
                  />

                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                  />

                  <FormControlLabel
                    value="top"
                    control={
                      <Switch
                        value={isAdmin}
                        checked={isAdmin}
                        onChange={handleChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label="Is Admin"
                    labelPlacement="top"
                  />

                  <Button
                    onClick={submitHandler}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Update
                  </Button>
                  {loadingUpdate && <CircularProgress />}
                  {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
                  <Grid container></Grid>
                  {/* {loading && <CircularProgress />}
                  {error && <Alert severity="error">{error}</Alert>} */}
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </>
        )}
      </form>
    </div>
  );
}
