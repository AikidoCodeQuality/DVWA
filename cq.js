const express = require("express");
const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await req.db.query(
    "SELECT * FROM users WHERE active = TRUE"
  );

  res.json(users.rows);
});

module.exports = router;
