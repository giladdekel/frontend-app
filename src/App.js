// import logo from './logo.svg';
// import './App.css';
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import NotFoundPage from "./screens/notfound/notfound.component";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Header from "./components/Header/Header";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SigninScreen from "./screens/SigninScreen/SigninScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        <div className="grid-container">
          <Header />
          <Switch>
            <Route path="/" component={HomeScreen} exact></Route>

            <Route path="/register" component={RegisterScreen}></Route>

            <Route path="/signin" component={SigninScreen}></Route>

            <Route path="/userlist" component={UserListScreen}></Route>

            <Route path="/user/:id/edit" component={UserEditScreen}></Route>

            {/* <Route path="/profile" component={ProfileScreen}></Route> */}

            <Route component={NotFoundPage} />
          </Switch>

          {/* <Footer /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
