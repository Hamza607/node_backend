const Training = require("../models/CourseModel");

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      benefits,
      content_type,
      avg_training_review,
      is_free,
      is_paid,
      available_as_one_time_purchase,
      available_in_subscription,
      is_share_on,
      status,
    } = req.body;

    // Manual validation
    if (!title || !description || !duration || !price || !content_type) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number.",
      });
    }

    if (
      isNaN(avg_training_review) ||
      avg_training_review < 0 ||
      avg_training_review > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Average review must be between 0 and 5.",
      });
    }

    if (!is_free && !is_paid) {
      return res.status(400).json({
        success: false,
        message: "At least one of 'is_free' or 'is_paid' must be true.",
      });
    }

    const course = new Training({
      title,
      description,
      duration,
      price,
      benefits,
      content_type,
      avg_training_review,
      is_free,
      is_paid,
      available_as_one_time_purchase,
      available_in_subscription,
      is_share_on,
      status,
      imageUpload: req.file ? req.file.filename : null,
    });

    const saveCourse = await course.save();

    res.status(201).json({ success: true, data: saveCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const { page, limit, startDate, endDate, title } = req.query;

    const skip = (page - 1) * limit;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    // Add date range filter if provided
    if (startDate || endDate) {
      filter.created_at = {};

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filter.created_at.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.created_at.$lte = end;
      }
    }

    // Get total count with filters applied
    const totalCourses = await Training.countDocuments(filter);

    // Fetch courses with filters
    const courses = await Training.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ created_at: -1 });

    // Format the response
    const formattedCourses = courses.map((course) => {
      const courseObj = course.toObject();
      if (courseObj.created_at) {
        courseObj.created_at = new Date(courseObj.created_at)
          .toISOString()
          .split("T")[0];
      }
      return courseObj;
    });

    const response = {
      success: true,
      data: formattedCourses,
      pagination: {
        totalCourses,
        totalPages: Math.ceil(totalCourses / limit),
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getAllCourse:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching courses",
    });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const course = await Training.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageUpload = req.file.filename;
    }

    const updatedCourse = await Training.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Training.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
