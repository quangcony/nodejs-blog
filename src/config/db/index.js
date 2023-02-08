const mongoose = require("mongoose");

async function Connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/jr10_education_dev");
    console.log("Connect Successfully!!");
  } catch (error) {
    console.log("Connect failure!!");
  }
}

module.exports = { Connect };
