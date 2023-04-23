const router = require("express").Router();
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

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(newReaction).delete(deleteReaction);

// POST to create a reaction stored in a single thought's reactions array field

module.exports = router;
