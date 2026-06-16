const express = require("express");
const cors = require("cors");
const pool = require("./db");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/", urlRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected",
      time: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Connection Failed");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});