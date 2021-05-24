import React from "react";
import "./App.css";
import Home from "./component/home/home";

import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./component/login/login";
import SignUp from "./component/signup/signup";
import Navbar from "./component/navbar/navbar";
import SearchData from "./component/searchdata/searchData";
import PrivateRoute from "./component/privateroute";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/search-data" component={SearchData} />
      </Switch>
    </>
  );
}

export default App;
