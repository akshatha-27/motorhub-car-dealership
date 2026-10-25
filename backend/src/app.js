const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

module.exports = app;
