// Require mongoose and other Schemas
const { Schema, model } = require("mongoose");
const thoughtsSchema = require("./thoughts");

// User Schema definition
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please write a valid email adress",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create User Model
const User = model("User", userSchema);

module.exports = User;
