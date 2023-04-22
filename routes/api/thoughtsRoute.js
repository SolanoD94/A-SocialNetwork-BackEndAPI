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
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

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
