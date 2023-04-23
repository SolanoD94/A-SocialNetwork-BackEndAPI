// Require Mongoose
const { Schema, model } = require("mongoose");
const userSchema = require("./user");

// Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: Schema.Types.ObjectId,
  },
  reactionBody: { type: String, required: true, max_length: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Thoughts Schema definition
const thoughtsSchema = new Schema({
  thoughtText: { type: String, required: true, min_length: 1, max_length: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { userSchema, type: String, required: true },
  reactions: [reactionSchema],
});

// Create Thoughts Model
const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
