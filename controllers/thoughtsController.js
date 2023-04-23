const Thoughts = require("../models/thoughts");
const User = require("../models/user");

module.exports = {
  // GET to get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with this Id." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async newThought(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user found with that Id.",
        });
      }

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const updateThought = await Thoughts.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!updateThought) {
        return res.status(404).json({ message: "No thought with that id." });
      }

      res.json(updateThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thoughts.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id." });
      }

      res.status(200).json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   /api/thoughts/:thoughtId/reactions
  // POST to create a reaction stored in a single thought's reactions array field
  async newReaction(req, res) {
    try {
      const { reactionBody } = await Thoughts.create(req.body);
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $addToSet: { reactions: { reactionBody } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: "Reaction created, but found no user with that ID",
        });
      }
      res.json("Created a new reaction!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtsId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      const reaction = await Thoughts.findOneAndUpdate(
        { reactionId: req.params.reactionId },
        { $pull: { reactionId: req.params.reactionId } },
        { new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Reaction created but no user with this id!" });
      }

      res.json({ message: "Reaction successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
