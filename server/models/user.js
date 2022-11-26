const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      email: true,
      unique: true,
    },
    password: {
      type: String,
      min: 1,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    lastAccessData: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true, collection: "Users" }
);

const User = mongoose.model("Users", userSchema);

module.exports = { User };
