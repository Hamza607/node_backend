const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const { password:_, ...userWithoutPassword } = user._doc;

    res
      .status(200)
      .json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
