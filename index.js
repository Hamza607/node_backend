const dotenv = require("dotenv");
dotenv.config();

const auth = require("./routes/auth");
const list = require("./routes/list");
const noteRoute = require("./routes/notes");
const courseRoute = require("./routes/CourseRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const connectDB = require("./db/index");
const path = require("path")
const express = require("express");
const cors = require("cors");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/v1", auth);
app.use("/api/v1", list);
app.use("/api/v1", employeeRoutes);
app.use("/api/v1", noteRoute);
app.use("/api/v1", courseRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
