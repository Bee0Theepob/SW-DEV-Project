const Appointment = require("../models/Appointment");
const Provider = require("../models/RentalCarProvider");
const User = require("../models/User");
//@desc Get all appointments
//@route GET /api/v1/appointments
//@access Private
exports.getAppointments = async (req, res, next) => {
  let query;

  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user._id })
      .populate("provider", "name address price tel")
      .populate("user", "name");
  } else {
    query = Appointment.find()
      .populate("provider", "name address price tel")
      .populate("user", "name");
  }

  try {
    const appointments = await query;
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "Cannot find Appointment",
    });
  }
};

//@desc GET single appointment
//@route GET /api/v1/appointments/:id
//@access Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "hospital",
      select: "name description tel",
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

//@desc Add appointment
//@route POST /api/v1/hospitals/:hospitalId/appointments/
//@access Private
exports.addAppointment = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.body.provider);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: `No provider with the id of ${req.body.provider}`,
      });
    }
    const existedAppointments = await Appointment.find({
      user: req.body.user,
    });
    if (existedAppointments.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.body.user} has already made 3 appointments`,
      });
    }
    console.log(req.body);
    const today = new Date(Date.now());
    const apptDate = new Date(req.body.apptDate);
    // console.log(today, "today", apptDate, "apptdate");
    if (new Date(req.body.apptDate) < today) {
      return res.status(400).json({
        success: false,
        message: `Booking date is invalid`,
      });
    }
    const appointment = await Appointment.create(req.body);

    const user1 = await User.findById(req.body.user);
    if (!user1) {
      return res.status(400).json({ success: false, msg: "not found" });
    }
    const loyaltyPoint = user1.loyaltyPoint + 1;

    const updatedPointData = { loyaltyPoint: loyaltyPoint };

    const user2 = await User.findByIdAndUpdate(req.body.user, updatedPointData);
    if (!user2) {
      return res.status(400).json({ success: false, msg: "not found" });
    }
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create appointment" });
  }
};

//@desc Update appointment
//@route Put /api/v1/appointments/:id
//@access Private
exports.updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }
    if (
      appointment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this appointment`,
      });
    }
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Appointment" });
  }
};

//@desc Delete appointment
//@route DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }
    if (
      appointment.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this bootcamp`,
      });
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Appointment" });
  }
};
