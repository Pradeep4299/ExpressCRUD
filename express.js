const express = require("express");

let app = express();

app.use(express.json());

const port = 4000;

//get all
app.get("/users", async (req, res) => {
  let response = await fetch("http://localhost:5000/content");
  let data = await response.json();
  if (!response.ok) {
    return res.json({ error: "Error while fetching data" });
  }
  res.json(data);
});

//get one
app.get("/users/:id", async (req, res) => {
  let { id } = req.params;
  if (id <= 0) {
    return res.json({ error: "Not a valid ID value" });
  }
  try {
    let response = await fetch(`http://localhost:5000/content/${id}`);
    let data = await response.json();
    if (!response.ok) {
      return res.json({ error: "error fetching the user" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//create
app.post("/users", async (req, res) => {
  let payload = req.body;
  let response = await fetch("http://localhost:5000/content/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let data = await response.json();
  if (!response.ok) {
    return res.json({ error: "Error while adding data" });
  }
  res.json(data);
});

//update
app.patch("/users/:id", async (req, res) => {
  let { id } = req.params;
  if (id <= 0) {
    return res.json({ error: "Not a valid ID value" });
  }
  let payload = req.body;
  try {
    let response = await fetch(`http://localhost:5000/content/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let data = await response.json();
    if (!response.ok) {
      return res.json({ error: "Error while adding data" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//delete
app.delete("/users/:id", async (req, res) => {
  let { id } = req.params;
  if (id <= 0) {
    return res.status(404).json({ error: "Not a valid ID value" });
  }
  try {
    let response = await fetch(`http://localhost:5000/content/${id}`, {
      method: "DELETE",
    });
    let data = await response.json();
    if (!response.ok) {
      return res.json({ error: "Error while deleting data" });
    }
    res.json({mssg:"Deleted successfully"});
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
