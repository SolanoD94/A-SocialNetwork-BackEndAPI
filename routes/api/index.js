const router = require("express").Router();
const userRoutes = require("./userRoute");
const thoughtsRoutes = require("./thoughtsRoute");

router.use("./user", userRoutes);
router.use("./thoughts", thoughtsRoutes);

module.exports = router;
