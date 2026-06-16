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

    const expiryDate = result.rows[0].expiry_date;

if (
  expiryDate &&
  new Date(expiryDate) < new Date()
) {
  return res.status(400).json({
    message: "Link Expired"
  });
}

await pool.query(
  "UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1",
  [shortCode]
);
    res.redirect(result.rows[0].original_url);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getAllUrls = async (req, res) => {
  try {
    const userId = req.user.id;

const result = await pool.query(
  "SELECT * FROM urls WHERE user_id = $1 ORDER BY created_at DESC",
  [userId]
);
    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM urls WHERE id = $1",
      [id]
    );

    res.json({
      message: "URL Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
module.exports = {
  createShortUrl,
  redirectUrl,
  getAllUrls,
  deleteUrl
};