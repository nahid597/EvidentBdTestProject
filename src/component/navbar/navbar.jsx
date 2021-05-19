import React, { useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickToggle = () => {
      setIsOpen(!isOpen);
  };

  const getStyleOfCollapse = () => {
    if(isOpen) {
        return 'show';
    } else {
        return '';
    }
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
        <div className= {`collapse navbar-collapse ${getStyleOfCollapse()}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link text-primary" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-primary" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item navbar-item-list-right">
              <a className="nav-link text-primary" href="/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
