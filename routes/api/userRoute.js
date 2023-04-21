const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createNewUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
