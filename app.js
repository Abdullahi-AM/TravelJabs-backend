const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Travel Jabs API" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
