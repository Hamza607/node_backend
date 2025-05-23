const express = require("express");
const router = express.Router();
const courseController = require("../controllers/CourseControler");
const upload = require("../middleware/upload");

router.post("/createCourse",upload.single("image"), courseController.createCourse);
router.get("/getCourse", courseController.getAllCourse);

router.get("/getCourseById/:id", courseController.getCourseById);

router.put("/updateCourse/:id",upload.single("image"), courseController.updateCourse);

router.delete("/deleteCourse/:id", courseController.deleteCourse);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imagePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl: imagePath });
});


module.exports = router;
