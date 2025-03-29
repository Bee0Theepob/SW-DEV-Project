// const express = require("express")
// const router = express.Router();
// const appointmentRouter=require("./appointments");
// const {protect, authorize} = require("../middleware/auth")
// const {getHospitals,getHospital,createHospital,updateHospital,deleteHospital} = require("../controllers/hospitals");

// router.use("/:hospitalId/appointments/",appointmentRouter);
// router.route("/").get(getHospitals).post(protect,authorize("admin"), createHospital);
// router.route("/:id").get(getHospital).put(protect,authorize("admin"), updateHospital).delete(protect,authorize("admin"), deleteHospital);

// module.exports = router;


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

// Re-route to rentalCars router
// router.use("/:rentalCarProviderId/rentalcars/", rentalCarRouter);

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
