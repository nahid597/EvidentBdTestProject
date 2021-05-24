const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

var router = express.Router();

router.get("/me",auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

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

  if (user) {
    return res.status(200).send({
      successful: false,
      message: "Already Registered",
      data: "",
    });
  }

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);

  user.password = hashPassword;

  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(200)
    .send({
      successful: true,
      message: "Registration successful",
      data: _.pick(user, ["_id", "firstName", "lastName", "email"]),
    });
});

module.exports = router;
