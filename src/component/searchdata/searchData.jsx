import React,{useState} from "react";
import dataService from "../../service/dataService";
import "./searchData.scss";

const SearchData = () => {
  const [postData, setPostData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitSearchData = async (event) => {
    event.preventDefault();
    const response = await dataService.postData(postData);

    setErrorMessage('');

    const {data, error, success} = response;
    
    if(!success) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');   

  };

  const onChangeInputField = (event) => {
    event.preventDefault();
    const target = event.target;
    var value = target.value;
    const name = target.name;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" style={{marginTop: "15px"}}>
          <form onSubmit={onSubmitSearchData} autoComplete="off">
            <h3 style={{textAlign: "center", marginTop: "10px"}}>Find Number here</h3>
            <div className="form-group input-filed">
              <label>
                <b>Input Values: </b>
              </label>
              <input
              name="inputData"
                type="text"
                className="form-control"
                placeholder="Enter input values Ex. 1,4,5"
                onChange={onChangeInputField}
              />
            </div>
            <div className="form-group input-filed">
              <label style={{width: "150px"}}>
                <b>Search Value:</b>
              </label>
              <input
              name="searchData"
                type="text"
                className="form-control"
                placeholder="Enter search value Ex. 5"
                onChange={onChangeInputField}
              />
            </div>
            <br/>
            {errorMessage && (
              <div className="form-group input-filed text-danger">
              {errorMessage}
            </div>
            )}
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
