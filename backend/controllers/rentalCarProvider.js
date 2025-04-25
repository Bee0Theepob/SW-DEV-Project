const RentalCarProvider = require("../models/RentalCarProvider");
const User = require("../models/User");

// @desc    Get all rental car providers
// @route   GET /api/v1/rentalcarproviders
// @access  Public
exports.getRentalCarProviders = async (req, res, next) => {
  try {
    let query;

    // Clone request query
    const reqQuery = { ...req.query };

    // Remove special query fields
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Build MongoDB filter object
    const filter = {};

    // 🔍 Text search for name (contains + case-insensitive)
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }

    // 🔍 Text search for address (contains + case-insensitive)
    if (req.query.address) {
      filter.address = { $regex: req.query.address, $options: "i" };
    }

    console.log(req.query);

    // 💰 Price range filter (e.g. ?minPrice=500&maxPrice=1500)
    if (req.query.loyaltyPoint !== 100) {
      if (
        (req.query.minPrice * 100) / (100 - req.query.loyaltyPoint) ||
        (req.query.maxPrice * 100) / (100 - req.query.loyaltyPoint)
      ) {
        filter.price = {};
        if (req.query.minPrice)
          filter.price.$gte = Number(
            (req.query.minPrice * 100) / (100 - req.query.loyaltyPoint)
          );
        if (req.query.maxPrice)
          filter.price.$lte = Number(
            (req.query.maxPrice * 100) / (100 - req.query.loyaltyPoint)
          );
      }
    }

    // Build query
    query = RentalCarProvider.find(filter);

    // 🎯 Field selection
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // ↕️ Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 📄 Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await RentalCarProvider.countDocuments(filter);

    query = query.skip(startIndex).limit(limit);

    const rentalCarProviders = await query;

    // ⏭ Pagination info
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    const responseData = rentalCarProviders.map((provider) => ({
      ...provider._doc,
      discountedPrice: Math.ceil(
        (provider.price * (100 - req.query.loyaltyPoint)) / 100
      ),
    }));

    console.log(responseData);

    res.status(200).json({
      success: true,
      count: rentalCarProviders.length,
      pagination,
      data: responseData,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single rental car provider
// @route   GET /api/v1/rentalcarproviders/:id
// @access  Public
exports.getRentalCarProvider = async (req, res, next) => {
  try {
    const rentalCarProvider = await RentalCarProvider.findById(req.params.id);

    if (!rentalCarProvider) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: rentalCarProvider });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create rental car provider
// @route   POST /api/v1/rentalcarproviders
// @access  Private
exports.createRentalCarProvider = async (req, res, next) => {
  const rentalCarProvider = await RentalCarProvider.create(req.body);
  res.status(201).json({ success: true, data: rentalCarProvider });
};

exports.updateRentalCarProvider = async (req, res, next) => {
  try {
    const rentalCarProvider = await RentalCarProvider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!rentalCarProvider) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: rentalCarProvider });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete rental car provider
// @route   DELETE /api/v1/rentalcarproviders/:id
// @access  Private
exports.deleteRentalCarProvider = async (req, res, next) => {
  try {
    const rentalCarProvider = await RentalCarProvider.findById(req.params.id);

    if (!rentalCarProvider) {
      return res.status(404).json({
        success: false,
        message: `Rental Car Provider not found with id of ${req.params.id}`,
      });
    }
    await RentalCarProvider.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
