const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "./data.json";

// READ
app.get("/expenses", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// CREATE
app.post("/expenses", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.json({ message: "Added", item: newItem });
});

// UPDATE
app.put("/expenses/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const updatedData = data.map(item =>
    item.id == req.params.id ? { ...item, ...req.body } : item
  );
  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData));
  res.json({ message: "Updated" });
});

// DELETE
app.delete("/expenses/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const filtered = data.filter(item => item.id != req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered));
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
