const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
//middleware to get data from request body
app.use(express.urlencoded({ extended: false }));
app.get("/users", (req, res) => {
  const html = `
    <ul>
     ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;
  return res.json(html);
});

//REST API
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    users.remove(user)
    return res.json({ status: "success", message:"user removed successfully"});
  });

app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(8000, () => {
  console.log(`server started at port 8000`);
});


