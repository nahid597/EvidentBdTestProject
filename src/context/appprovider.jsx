import React, { Component } from "react";
import GLOBAL from "../global";
import AppContext from "./appcontext";

class AppProvider extends Component {
  state = {
    authenticated: false,
    userInfo: null,
  };

  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      GLOBAL.USER_INFO = userInfo;
      this.authenticate(true);
    }
  }

  authenticate = (authenticated) => {
    this.setState({ authenticated: authenticated });
  };

  deAuthenticate = () => {
    this.setState({ authenticated: false, userInfo: null });
    GLOBAL.USER_INFO = null;
    localStorage.removeItem("userInfo");
  };

  storeUserInfo = (userInfo) => {
    this.setState({ userInfo: userInfo });
  };

  storeUserInfoToLocalStorage = () => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(GLOBAL.USER_INFO));
  };

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          authenticate: this.authenticate,
          deAuthenticate: this.deAuthenticate,
          storeUserInfo: this.storeUserInfo,
          storeUserInfoToLocalStorage: this.storeUserInfoToLocalStorage,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
