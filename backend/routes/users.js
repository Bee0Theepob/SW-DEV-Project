const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { getUsers, updateUser } = require("../controllers/users");

// Routes for RentalCarProviders
router.route("/").get(protect, authorize("admin"), getUsers);
router.route("/:id").put(protect, authorize("admin"), updateUser);

module.exports = router;
