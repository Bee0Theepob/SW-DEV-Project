const mongoose = require("mongoose");

const RentalCarProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    tel: {
      type: String,
      required: [true, "Please add a telephone number"],
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to populate related rental cars
RentalCarProviderSchema.virtual("rentalCars", {
  ref: "RentalCar",
  localField: "_id",
  foreignField: "company",
  justOne: false,
});

module.exports = mongoose.model("RentalCarProvider", RentalCarProviderSchema);
