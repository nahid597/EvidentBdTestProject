import React, {useState} from "react";
import "./signup.scss";

const SignUp = () => {
  const[signUpData, setSignUpData] = useState({});

  const onSubmitSignUpData = (event) => {
    event.preventDefault();
    console.log(signUpData);
  };

  const onChangeInputField = (event) => {
    event.preventDefault();
    const target = event.target;
    var value = target.value;
    const name = target.name;

    setSignUpData({
      ...signUpData,
      [name]: value
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 sign-up-section">
          <form onSubmit={onSubmitSignUpData} autoComplete="off">
            <h3 style={{textAlign: "center", marginTop: "10px"}}>Sign Up</h3>
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
