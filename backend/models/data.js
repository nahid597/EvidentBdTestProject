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
});

const Data = mongoose.model("Data", DataSchema);

function validateData(data) {
  const schema = Joi.object({
    inputData: Joi.string().required(),
    searchData: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.Data = Data;
exports.validate = validateData;
