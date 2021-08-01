import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from '@material-ui/core/Link';

// import { Link } from "react-router-dom";
// import {
//   findFacebookByEmail,
//   signin,
//   signWithGoogle,
// } from "../../actions/userActions";
// import LoadingBox from "../../components/LoadingBox";
// import MessageBox from "../../components/MessageBox";
// import { GoogleLogin } from "react-google-login";
// import GitHubLogin from "react-github-login";

// import "./SigninScreen.scss";
// import { findByEmail } from "./../../actions/userActions";
// import ReactFacebookLogin from "react-facebook-login";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// import {
//   findFacebookByEmail,
//   signin,
//   signWithGoogle,
// findByEmail
// } from "../../actions/userActions";

import { signin } from "../../actions/userActions";

// import { GoogleLogin } from "react-google-login";
// import ReactFacebookLogin from "react-facebook-login";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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

export default function SigninScreen(props) {
  const classes = useStyles();
  // console.log("props :", props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  // const responseFacebook = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.accessToken);
  //   dispatch(findFacebookByEmail(response));
  // };

  // const responseGoogle = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.tokenId);

  //   dispatch(findByEmail(response));
  // };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  // const responseGoogle = (response) => {
  //   // console.log("response :", response);
  //   // console.log("response :", response.tokenId);

  //   dispatch(findByEmail(response));
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={submitHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>

            {/* <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            // cookiePolicy="single_host_origin"
            theme="dark"
          />
          <ReactFacebookLogin
            icon="fa-facebook"
            appId={process.env.REACT_APP_FACEBOOK_ID}
            // autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            // onSuccess={responseFacebook}
            callback={responseFacebook}
          /> */}

            {/* <GitHubLogin
            clientId="603a2ad4134171bc96a4"
            onSuccess={onSuccess}
            onFailure={onFailure}
          /> */}

            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  // return (
  //   <div className="signin-screen">
  //     <form className="form" onSubmit={submitHandler}>
  //       <div>
  //         <h1>Sign In</h1>
  //       </div>
  //       {loading && <LoadingBox></LoadingBox>}
  //       {error && <MessageBox variant="danger">{error}</MessageBox>}
  //       <div>
  //         <label htmlFor="email">Email address</label>
  //         <input
  //           type="email"
  //           id="email"
  //           placeholder="Enter email"
  //           required
  //           onChange={(e) => setEmail(e.target.value)}
  //         ></input>
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password</label>
  //         <input
  //           type="password"
  //           id="password"
  //           placeholder="Enter password"
  //           required
  //           onChange={(e) => setPassword(e.target.value)}
  //         ></input>
  //       </div>
  //       <div>
  //         <label />
  //         <button className="primary" type="submit">
  //           Sign In
  //         </button>
  //       </div>
  //       <div>
  //         {" "}
  //         <div>
  //           New customer?{" "}
  //           <Link to={`/register?redirect=${redirect}`}>
  //             Create your account
  //           </Link>
  //         </div>
  //         <label />
  //         {/* <button
  //           className="btn btn-lg btn-google btn-block text-uppercase"
  //           type="button"
  //         >
  //           <i className="fab fa-google mr-2" /> Sign in with Google
  //         </button>
  //         <button
  //           className="btn btn-lg btn-facebook btn-block text-uppercase"
  //           type="button"
  //         >
  //           <i className="fab fa-facebook-f mr-2" /> Sign in with Facebook
  //         </button> */}
  //         <GoogleLogin
  //           clientId={process.env.REACT_APP_GOOGLE_ID}
  //           onSuccess={responseGoogle}
  //           onFailure={responseGoogle}
  //           // cookiePolicy="single_host_origin"
  //           theme="dark"
  //         />
  //         <ReactFacebookLogin
  //           icon="fa-facebook"
  //           appId={process.env.REACT_APP_FACEBOOK_ID}
  //           // autoLoad={true}
  //           fields="name,email,picture"
  //           // onClick={componentClicked}
  //           // onSuccess={responseFacebook}
  //           callback={responseFacebook}
  //         />
  //         {/* <GitHubLogin
  //           clientId="603a2ad4134171bc96a4"
  //           onSuccess={onSuccess}
  //           onFailure={onFailure}
  //         /> */}
  //       </div>
  //     </form>
  //   </div>
  // );
}
