import React from "react";
import "./login.scss"

const Login = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 sign-in-section">
        <form>
                <h3 style={{textAlign: "center", marginTop: "10px"}}>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button style={{margin:"10px"}} type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Login;
