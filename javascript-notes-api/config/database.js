//1 - Import mongoose
const mongoose = require("mongoose");
//2 - Connect mongoose with the global promise
mongoose.Promise = global.Promise;
//3 - Connect with the DB
mongoose
  .connect("mongodb://localhost/javascriptnote", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, THIS IS NO LONGER SUPPORTED - it's automatically set to true
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));
