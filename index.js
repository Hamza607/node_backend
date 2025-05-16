const dotenv = require("dotenv");
dotenv.config();

const auth = require("./routes/auth");
const list = require("./routes/list");
const employeeRoutes = require("./routes/employeeRoutes");
const connectDB = require("./db/index");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1", auth);
app.use("/api/v1", list);
app.use("/api/v1", employeeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
