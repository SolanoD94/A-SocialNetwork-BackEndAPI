const User = require("../models/user");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("Thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST a new user
  async createNewUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const userUpdate = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!userUpdate) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.json(userUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE to remove user by its _id
  async deleteUser(req, res) {
    try {
      const userDelete = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      res.status(200).json(userDelete);
      console.log(`Deleted: ${userDelete}`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   /api/users/:userId/friends/:friendId
  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const newFriend = await User.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { friends: newFriend._id } },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Friend created, but found no user with that ID" });
      }
      res.json("Created new friend!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const friendDelete = await User.findOneAndRemove({
        _id: req.params.friendId,
      });

      if (!friendDelete) {
        return res.status(404).json({ message: "No friend with that id." });
      }

      const user = await User.findOneAndUpdate(
        { friends: req.params.friendId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that id." });
      }

      res.status(200).json({ message: "Friend deleted! :(" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
