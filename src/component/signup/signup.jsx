import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import authService from "../../service/authService";
import "./signup.scss";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const onSubmitSignUpData = async (event) => {
    event.preventDefault();
    const response = await authService.register(signUpData);

    setErrorMessage('');
    setIsRegister(false);

    const { error, success} = response;

    if(!success) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');
    setIsRegister(true);    

  };

  if(isRegister) {
    return <Redirect to="/login" />
  }

  const onChangeInputField = (event) => {
    event.preventDefault();
    const target = event.target;
    var value = target.value;
    const name = target.name;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 sign-up-section">
          <form onSubmit={onSubmitSignUpData} autoComplete="off">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Sign Up</h3>
            <div className="form-group">
              <label>
                <b>First name</b>
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={onChangeInputField}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Last name</b>
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={onChangeInputField}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Email address </b>
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                autoComplete="off"
                onChange={onChangeInputField}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Password</b>
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                autoComplete="off"
                onChange={onChangeInputField}
              />
            </div>
            {errorMessage && (
              <div className="form-group">
              <p className="text-danger">{errorMessage}</p>
            </div>
            )}
            <button
              style={{ marginTop: "10px" }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default SignUp;
