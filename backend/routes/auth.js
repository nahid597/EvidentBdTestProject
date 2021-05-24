const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");


const { User } = require("../models/user");

var router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send({
      successful: false,
      message: error.details[0].message,
      data: "",
    });
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(200).send({
      successful: false,
      message: "Invalid email or password",
      data: "",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(200).send({
        successful: false,
        message: "Invalid email or password",
        data: "",
      });
  }

  const token = user.generateAuthToken();

  res.send({
      successful: true,
      message: "Logged in",
      data: {
        user:user,
        token:token
      },
  });
  
});

function validate(user) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).max(255),
    });
  
    return schema.validate(user);
  }

module.exports = router;
