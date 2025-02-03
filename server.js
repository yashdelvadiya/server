const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "data.json";

// Ensure the file exists
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));

// Store Data
app.post("/storeData", (req, res) => {
  let newData = req.body;
  let storedData = JSON.parse(fs.readFileSync(DATA_FILE));
  storedData.push(newData);
  fs.writeFileSync(DATA_FILE, JSON.stringify(storedData, null, 2));
  res.json({ message: "Data saved successfully!" });
});

// Get All Data (For Admin Panel)
app.get("/getData", (req, res) => {
  let storedData = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(storedData);
});

app.listen(3000, () => console.log("Server running on port 3000"));
