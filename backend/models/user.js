const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

UserSchema.methods.generateAuthToken = function(params) {
  const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(5).max(100),
    lastName: Joi.string().required().min(5).max(100),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;