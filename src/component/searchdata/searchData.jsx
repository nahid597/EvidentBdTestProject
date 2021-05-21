import React from "react";
import "./searchData.scss";

const SearchData = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" style={{marginTop: "15px"}}>
          <form autoComplete="off">
            <h3 style={{textAlign: "center", marginTop: "10px"}}>Find Number here</h3>
            <div className="form-group input-filed">
              <label>
                <b>Input Values: </b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter input values Ex. 1,4,5"
              />
            </div>
            <div className="form-group input-filed">
              <label style={{width: "150px"}}>
                <b>Search Value:</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter search value Ex. 5"
              />
            </div>
            <button
              style={{ marginTop: "10px",display:"block" }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Khoj
            </button>
          </form>
          <div style={{ marginTop: "10px" }}>
            <h4>Result: </h4>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default SearchData;
