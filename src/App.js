import React, { Component } from "react";
import "./App.css";
import Home from "./component/home/home";

import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./component/login/login";
import SignUp from "./component/signup/signup";
import Navbar from "./component/navbar/navbar";
import SearchData from "./component/searchdata/searchData";
import PrivateRoute from "./component/privateroute";
import GLOBAL from "./global";

class App extends Component {
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      GLOBAL.USER_INFO = userInfo;
      // this.authenticate(true);
      // this.storeUserInfo(userInfo);
    }
  }
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/search-data" component={SearchData} />
        </Switch>
      </>
    );
  }
}

export default App;
