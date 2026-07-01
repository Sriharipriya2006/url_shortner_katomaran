const pool = require("../db");
const { nanoid } = require("nanoid");

const createShortUrl = async (req, res) => {
  try {
    const { url, expiryDate } = req.body;

    const userId = req.user.id;
    const shortCode = nanoid(6);

    const result = await pool.query(
      `INSERT INTO urls(user_id, original_url, short_code, expiry_date)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [userId, url, shortCode, expiryDate]
    );

    res.status(201).json({
      message: "Short URL Created",
      shortUrl: `http://localhost:5000/${shortCode}`,
      data: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await pool.query(
      "SELECT * FROM urls WHERE short_code = $1",
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "URL Not Found"
      });
    }

    const originalUrl = result.rows[0].original_url;

    return res.redirect(originalUrl);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl
};