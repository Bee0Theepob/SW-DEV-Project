const express = require("express");
const router = express.Router();
// const appointmentRouter=require("./appointments");
// const rentalCarRouter = require("./rentalCars");
const { protect, authorize } = require("../middleware/auth");
const {
  getRentalCarProviders,
  getRentalCarProvider,
  createRentalCarProvider,
  updateRentalCarProvider,
  deleteRentalCarProvider,
} = require("../controllers/rentalCarProvider");

// Routes for RentalCarProviders
router
  .route("/")
  .get(getRentalCarProviders)
  .post(protect, authorize("admin"), createRentalCarProvider);

router
  .route("/:id")
  .get(getRentalCarProvider)
  .put(protect, authorize("admin"), updateRentalCarProvider)
  .delete(protect, authorize("admin"), deleteRentalCarProvider);

module.exports = router;
