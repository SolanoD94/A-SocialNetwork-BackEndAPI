const router = require("express").Router;
const {
  getAllThoughts,
  getSingleThought,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getAllThoughts).post(newThought);

// /api/toughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(newReaction).delete(deleteReaction);

// POST to create a reaction stored in a single thought's reactions array field

module.exports = router;
