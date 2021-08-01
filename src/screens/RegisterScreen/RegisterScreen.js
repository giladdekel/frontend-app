import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";

import Alert from "@material-ui/lab/Alert";

// import MuiAlert from "@material-ui/lab/Alert";

// import {
//   findByEmail,
//   findFacebookByEmail,
//   register,
// } from "../actions/userActions";

// import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login";

import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Gilad Dekel
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  green: {
    borderColor: "green",
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

  //////// regex start/////////////////////////////
  const [validName, setValidName] = useState("blue");

  const [validEmail, setValidEmail] = useState("blue");
  const [validPassword, setValidPassword] = useState("blue");
  const [validConfirmPassword, setValidConfirmPassword] = useState("blue");

  const patterns = {
    name: /^[\p{L} ,.'-]+$/u,

    email: /^\w+@[ a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,

    password: /^[0-9a-zA-Z]{4,}$/,
    confirmPassword: /^[0-9a-zA-Z]{4,}$/,
  };

  const handleKey = (event) => {
    let typeOfInput = event.target.attributes.name.value;
    let value = event.target.value;
    // console.log("value :", value);

    // console.log("patterns[typeOfInput] :", patterns[typeOfInput]);
    // console.log("typeOfInput :", typeOfInput);

    validate(value, patterns[typeOfInput], typeOfInput);
  };

  function validate(value, regex, typeOfInput) {
    let validationState = regex.test(value);

    switch (typeOfInput) {
      case "name":
        validationState ? setValidName("green") : setValidName("red");
        break;
      case "email":
        validationState ? setValidEmail("green") : setValidEmail("red");
        break;
      case "password":
        validationState ? setValidPassword("green") : setValidPassword("red");
        break;
      case "confirmPassword":
        validationState
          ? setValidConfirmPassword("green")
          : setValidConfirmPassword("red");
        break;

      default:
        break;
    }
  }

  ////////// regex end ///////////////////////////////

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { userInfo, loading, error } = userRegister;

  const userSignin = useSelector((state) => state.userSignin);
  const {
    userInfo: userInfoSignIn,
    loading: loadingSignIn,
    error: errorSignIn,
  } = userSignin;

  useEffect(() => {
    if (userInfo || userInfoSignIn) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo, userInfoSignIn]);

  const classes = useStyles();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsNotMatch("Password and Confirm password are not match");
      setTimeout(() => {
        setPasswordsNotMatch(false);
      }, 3000);
    }

    else if (
      validName === "green" &&
      validEmail === "green" &&
      validPassword === "green"
    ) {
      dispatch(register(name, email, password));
    }

  };

  // const responseGoogle = (response) => {
  //   dispatch(findByEmail(response));
  // };

  // const responseFacebook = (response) => {
  //   dispatch(findFacebookByEmail(response));
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {validName === "blue" && (
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  value={name}
                  onKeyUp={handleKey}
                />
              )}

              {validName === "green" && (
                <ThemeProvider theme={theme}>
                  <TextField
                    variant="outlined"
                    required
                    defaultValue="Success"
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="fname"
                    name="name"
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    value={name}
                    onKeyUp={handleKey}
                  />
                </ThemeProvider>
              )}

              {validName === "red" && (
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  error
                  helperText="Ivalid name."
                  value={name}
                  onKeyUp={handleKey}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              {validEmail === "blue" && (
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onKeyUp={handleKey}
                />
              )}

              {validEmail === "green" && (
                <ThemeProvider theme={theme}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onKeyUp={handleKey}
                  />
                </ThemeProvider>
              )}

              {validEmail === "red" && (
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText="invalid email."
                  error
                  onKeyUp={handleKey}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {validPassword === "blue" && (
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                 
                  
                  onKeyUp={handleKey}
                />
              )}

              {validPassword === "green" && (
                <ThemeProvider theme={theme}>
                  {" "}
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onKeyUp={handleKey}
                  />
                </ThemeProvider>
              )}

              {validPassword === "red" && (
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText="invalid password."
                  error
                  onKeyUp={handleKey}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              {validConfirmPassword === "blue" && (
                <TextField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onKeyUp={handleKey}
                />
              )}

              {validConfirmPassword === "green" && (
                <ThemeProvider theme={theme}>
                  {" "}
                  <TextField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onKeyUp={handleKey}
                  />
                </ThemeProvider>
              )}

              {validConfirmPassword === "red" && (
                <TextField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onKeyUp={handleKey}
                  helperText="invalid password."
                  error
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={submitHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
          />
          <FacebookLogin
            icon="fa-facebook"
            appId={process.env.REACT_APP_FACEBOOK_ID}
            // autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            // onSuccess={responseFacebook}
            callback={responseFacebook}
          /> */}
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {passwordsNotMatch && (
            <Alert severity="error">
              Password and confirm password are not match
            </Alert>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={`/signin?redirect=${redirect}`} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
