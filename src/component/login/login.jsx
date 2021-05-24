import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AppContext from "../../context/appcontext";
import GLOBAL from "../../global";
import authService from "../../service/authService";
import "./login.scss";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const {
    authenticated,
    authenticate,
    storeUserInfo,
    storeUserInfoToLocalStorage,
  } = useContext(AppContext);

  const onSubmitLoginData = async (event) => {
    event.preventDefault();
    const response = await authService.login(loginData);
    const { data, error, success } = response;

    setErrorMessage("");

    if (!success) {
      setErrorMessage(error);
      return;
    }

    const userInfo =  data;
    GLOBAL.USER_INFO = userInfo;
    authenticate(true);
    storeUserInfo(GLOBAL.USER_INFO);
    storeUserInfoToLocalStorage();
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  const onChangeInputField = (event) => {
    event.preventDefault();
    const target = event.target;
    var value = target.value;
    const name = target.name;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 sign-in-section">
          <form onSubmit={onSubmitLoginData}>
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={onChangeInputField}
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={onChangeInputField}
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            {errorMessage && (
              <div className="form-group">
                <p className="text-danger">{errorMessage}</p>
              </div>
            )}
            <button
              style={{ margin: "10px" }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Login;
