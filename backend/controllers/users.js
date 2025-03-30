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

exports.toggleBan = async (req,res,next) => {
  try {
      const user1 = await User.findById(req.params.id);
      if(user1.role === "admin"){
        return res.status(400).json({ success: false, msg:"cant ban admin" });
      }
      const user2 = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
      );
  
      if (!user2) {
        return res.status(400).json({ success: false,msg:"not found" });
      }
      res.status(200).json({ success: true, data: user2 });
    } catch (err) {
      console.log(err.stack)
      res.status(400).json({ success: false });
    }
}