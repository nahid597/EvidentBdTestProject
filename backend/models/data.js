const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const DataSchema = new Schema({
  inputData: {
    type: String,
    required: true,
  },
  searchData: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const GetInputValueSchema = new Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Data = mongoose.model("Data", DataSchema);
const GetInputValue = mongoose.model("GetInputValue", GetInputValueSchema);

function validateData(data) {
  const schema = Joi.object({
    inputData: Joi.string().required(),
    searchData: Joi.string().required()
  });

  return schema.validate(data);
}

function validateInputValues(data) {
  const schema = Joi.object({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    userId: Joi.string().required()
  });

  return schema.validate(data);
}

exports.Data = Data;
exports.validate = validateData;
exports.GetInputValue = GetInputValue;
exports.validateGetInput = validateInputValues;
