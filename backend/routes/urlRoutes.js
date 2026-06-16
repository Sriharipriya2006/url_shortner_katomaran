const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  createShortUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl
} = require("../controllers/urlController");

router.post("/shorten", verifyToken, createShortUrl);
router.get("/all", verifyToken, getAllUrls);
router.get("/:shortCode", redirectUrl);
router.delete("/:id", verifyToken, deleteUrl);
// router.post("/shorten", verifyToken, createShortUrl);
// router.get("/all", verifyToken, getAllUrls);
module.exports = router;