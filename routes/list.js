const router = require("express").Router();

const User = require("../models/user");

const List = require("../models/list");

router.post("/addList", async (req, res) => {
  const { title, body, email } = req.body;
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const newList = new List({
        title,
        body,
        user: existingUser,
      });
      await newList.save();
      existingUser.list.push(newList);
      await existingUser.save();
      return res
        .status(200)
        .json({ message: "List added successfully", newList });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in addList:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

router.put("/updateList/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const updatedList = await List.findByIdAndUpdate(req.params.id, {
        title,
        body,
        user: existingUser,
      });
      updatedList.save().then(() => {
        res
          .status(200)
          .json({ message: "List updated successfully", updatedList });
      });
    }
  } catch (error) {}
});

router.delete("/deleteList/:id", async (req, res) => {
  try {
    const { id } = req.body;

    const existingUser = await User.findByIdAndUpdate(
      id,
      { $pull: { list: req.params.id } },
      { new: true } // Optional: returns the updated user document
    );

    await List.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error("Delete list error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getList/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length === 0) {
    return res.status(404).json({ message: "List not found" });
  } else {
    return res.status(200).json({ list });
  }
});

module.exports = router;
