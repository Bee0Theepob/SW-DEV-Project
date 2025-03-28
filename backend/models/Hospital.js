const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more thar 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    district: {
      type: String,
      required: [true, "Please add district"],
    },
    province: {
      type: String,
      required: [true, "Please add province"],
    },
    postalcode: {
      type: String,
      required: [true, "Please add a postalcode"],
      maxlength: [5, "Postal Code can not be more than 5 digits"],
    },
    tel: {
      type: String,
    },
    region: {
      type: String,
      required: [true, "Please add a region"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

HospitalSchema.virtual("appointments",{
    ref: "Appointment",
    localField: "_id",
    foreignField:"hospital",
    justOne:false
});
   

module.exports = mongoose.model("Hospital", HospitalSchema);
