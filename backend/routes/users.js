const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
getUsers,
toggleBan
} = require("../controllers/users");

// Re-route to rentalCars router
// router.use("/:rentalCarProviderId/rentalcars/", rentalCarRouter);

// Routes for RentalCarProviders
router
  .route("/")
  .get(protect, authorize("admin"),getUsers);
router
  .route("/:id")
  .put(protect,authorize("admin"),toggleBan);


module.exports = router;