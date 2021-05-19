import React from "react";
import "./App.css";
import Home from "./component/home/home";

import { BrowserRouter as Switch, Route } from "react-router-dom";
import Login from "./component/login/login";
import SignUp from "./component/signup/signup";
import Navbar from "./component/navbar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
}

export default App;
