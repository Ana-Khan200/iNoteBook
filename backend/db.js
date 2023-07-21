const mongoose = require("mongoose");
const url = ("mongodb://0.0.0.0:27017/iNoteBook");

const connectToMongo = () => {
  mongoose.connect(url, () => {
    console.log("connected successfully");
  });
};

module.exports = connectToMongo;
