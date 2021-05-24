const express = require("express");
const _ = require("lodash");

const auth = require("../middleware/auth");
const {
  Data,
  validate,
  validateGetInput,
} = require("../models/data");

const router = express.Router();

router.post("/get-values", auth, async (req, res) => {
  const { error } = validateGetInput(req.body);

  if (error) {
    return res.status(200).send({
      successful: false,
      message: error.details[0].message,
      data: "",
    });
  }

  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const userId = req.body.userId;

  console.log(startDate);

  const result = await Data.find({
    userId: userId,
    $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
  });

  let storeSearchResult = [];

  for (let i = 0; i < result.length; i++) {
    let date = result[i].date;
    let inputData = result[i].inputData;
    let data = {
      timestamp: date,
      input_values: inputData,
    };
    storeSearchResult.push(data);
  }

  res.status(200).send({
    status: "success",
    user_id: userId,
    payload: storeSearchResult,
  });
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(200).send({
      successful: false,
      message: error.details[0].message,
      data: "",
    });
  }

  let inputData = req.body.inputData;
  let searchData = parseInt(req.body.searchData);
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

  let result = dataSearch(storeInputDataIntFormate, searchData);
  let currentDate = new Date();

  let data = new Data(_.pick(req.body, ["inputData", "searchData"]));

  data.inputData = sortDataString;
  data.userId = req.user._id;
  data.date = currentDate.toISOString();

  await data.save();

  res.status(200).send({
    successful: true,
    message: "Data post successfully",
    data: result,
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
const dataSearch = (inputArr, data) => {
  let len = inputArr.length;
  let result = false;
  for (let i = 0; i < len; i++) {
    if (inputArr[i] === data) {
      result = true;
    }
  }
  return result;
};

module.exports = router;
