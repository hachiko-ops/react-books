const express = require("express");

const app = express();
const PORT = 5174;

app.get("/", (req, res) => {
  res.send("React Experiences API is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});