const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dondecanseco",
  database: "tell"
});

app.get("/screening/details", async (req, res) => {
  console.log("Request received:", req.path, req.query);
  const { movieId, placeId, auditoriumNumber } = req.query;

  if (!movieId || !placeId || !auditoriumNumber) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT
        m.title,
        m.poster_path,
        m.audio_description_path,
        s.credits_end,
        s.previews_start,
        s.movie_start
      FROM movies m
      JOIN screenings s ON m.id = s.movie_id
      JOIN auditoriums a ON s.auditorium_id = a.id
      JOIN theaters t ON a.location_id = t.id
      WHERE m.movie_id = ?
        AND t.place_id = ?
        AND a.number = ?
      LIMIT 1
    `,
      [movieId, placeId, auditoriumNumber]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Screening not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
