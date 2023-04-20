// Require Mongoose
const mongoose = require("mongoose");
const userSchema = require("./user");

// Thoughts Schema definition
const thoughtsSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, min_length: 1, max_length: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { userSchema, type: String, required: true },
});

// Reaction Schema
const reactionSchema = new mongoose.Schema({
  reactionId: { type: Schema.Types.ObjectId, default: ObjectId.new },
});

// Create Thoughts Model
const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

// Error handler function to be called when an error occurs when trying to save a document
//const handleError = (err) => console.error(err);

module.exports = Thoughts;
