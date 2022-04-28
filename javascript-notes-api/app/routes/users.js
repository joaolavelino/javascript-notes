var express = require("express");
var router = express.Router();
//1 - import the model
const User = require("../models/user");
//part-six-6 - import the jwt
const jwt = require("jsonwebtoken");
//part-six-7-8 - import the environment variable
require("dotenv").config();
const secret = process.env.JWT_TOKEN;

//--USER REGISTER ROUTE--
router.post("/register", async (req, res) => {
  // read these 3 infos from the body of the request
  const { name, email, password } = req.body;
  // create a user with these infos (these are the infos requested by the model. I'm not saving yet.)
  const user = new User({ name, email, password });
  try {
    //try to save the user on the db
    await user.save();
    //if it's ok, we'll respond with a successful status and show back the user as a json object (this object will be used to check the requests on Postman)
    res.status(200).json(user);
  } catch (error) {
    //if it's not ok, throw back the failure status 500 (internal server eror) and the error
    res.status(500).json({ error: "Error on the register of the new user" });
  }
});

//--USER LOGIN ROUTE--
router.post("/login", async (req, res) => {
  //get the information from the request body
  const { email, password } = req.body;
  try {
    //find the user by matching the email
    let user = await User.findOne({ email });
    //if the user doesn't exist - throw unavailable resource status and error
    if (!user) res.status(401).json({ error: "Incorrect email or password" });
    else {
      //if the user exists throw the password verification function that was created in the model.
      user.isCorrectPassword(password, (err, same) => {
        //if the password is not the same - throw unavailable resource status and error
        if (!same)
          res.status(401).json({ error: "Incorrect email or password" });
        else {
          //if it's the same: create token using the jwt sign method and throwing the data that will be used in the token creation, in this case the email, the environment variable and setting an expiring time for the token.
          const token = jwt.sign({ email }, secret, { expiresIn: "10d" });
          //and respond a json with the user and the token
          res.json({ user: user, token: token });
        }
      });
    }
  } catch (error) {
    //if it's not ok, throw back the failure status 500 (internal server eror) and the error - this is not the wrong password
    res.status(500).json({ error: "Internal server error, please try again." });
  }
});

module.exports = router;
