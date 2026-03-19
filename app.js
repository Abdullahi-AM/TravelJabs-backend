const express = require("express");

// Configure express app -----------------------------------
const app = express();

// Configure middleware -------------------------------------
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Controllers ---------------------------------------------

// Endpoints -----------------------------------------------
app.get("/api", (req, res) => {
  res.json({ message: "Travel Jabs API" });
});

// Start server --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
