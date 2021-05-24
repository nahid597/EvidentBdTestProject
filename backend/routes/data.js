const express = require("express");
const _ = require("lodash");

const auth = require("../middleware/auth");
const { Data, validate } = require("../models/data");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  console.log(req.body);

  if (error) {
    return res.status(200).send({
      successful: false,
      message: error.details[0].message,
      data: "",
    });
  }

  let inputData = req.body.inputData;
  let storeInputDataIntFormate = [];
  let splitInputData;

  splitInputData = inputData.split(",");

  for (let i = 0; i < splitInputData.length; i++) {
    let data = parseInt(splitInputData[i]);
    if (data) {
      storeInputDataIntFormate.push(data);
    }
  }

  const sortData = bubbleSort(storeInputDataIntFormate);

  let sortDataString = "";

  for (let i = 0; i < sortData.length; i++) {
    let data = sortData[i].toString();
    sortDataString += data;

    if (i !== sortData.length - 1) {
      sortDataString += ",";
    }
  }

  console.log(sortDataString);

  let data = new Data(_.pick(req.body, ["inputData", "searchData"]));

  data.inputData = sortDataString;

  await data.save();

  res.status(200).send({
    successful: true,
    message: "Data post successfully",
    data: _.pick(data, ["_id", "inputData", "searchData"]),
  });
});

const bubbleSort = (inputArr) => {
  let len = inputArr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (inputArr[j] < inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
      }
    }
  }
  return inputArr;
};

module.exports = router;
