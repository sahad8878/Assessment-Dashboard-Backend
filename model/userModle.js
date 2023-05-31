const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, "fName is required"],
    },
    lName: {
      type: String,
      trim: true,
      required: [true, "lName is required"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", clientSchema);
module.exports = userModel;
