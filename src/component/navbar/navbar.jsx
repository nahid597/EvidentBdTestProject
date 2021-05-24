import React, { useContext, useState } from "react";
import AppContext from "../../context/appcontext";
import "./navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated, deAuthenticate } = useContext(AppContext);

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const getStyleOfCollapse = () => {
    if (isOpen) {
      return "show";
    } else {
      return "";
    }
  };

  const onClickSignOut = (e) => {
    e.preventDefault();
    deAuthenticate();
    goToLoginPage();
  };

  const goToLoginPage = () => {
    window.location.href="/login"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          style={{ marginLeft: "10px" }}
          className="navbar-brand ml-md-3"
          href="https://evidentbd.com/"
        >
          EvidentBd
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={onClickToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${getStyleOfCollapse()}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-primary" href="/">
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link text-primary" href="/search-data">
                Data Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-primary" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item navbar-item-list-right">
              {authenticated ? (
                <a
                  className="nav-link text-primary"
                  onClick={(e) => onClickSignOut(e)}
                  href="{!#}"
                >
                  Sign out
                  </a>
              ) : (
                <a className="nav-link text-primary" href="/login">
                  Sign in
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
