const User = require("../models/User");

// @desc    Get all rental car providers
// @route   GET /api/v1/rentalcarproviders
// @access  Public
exports.getUsers = async (req, res, next) => {
  let query;
  query = User.find();

  try {
    const users = await query;
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({success: false});
  }
};