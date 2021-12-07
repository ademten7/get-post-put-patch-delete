const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const data = fs.readFileSync(
  path.resolve(__dirname, "../models/db.json"),
  "utf-8"
);
//convert from JSON to JS
const users = JSON.parse(data).users;

router.get("/", (req, res) => {
  res.send(users);
});

// function replacer(key, value) {
//   if (key === "first_name" || key === "last_name") {
//     return value;
//   }
//   return undefined;
// }

router.post("/", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  fs.writeFileSync(
    path.resolve(__dirname, "../models/db.json"),
    JSON.stringify({ users }, null, 2) //null ==>how we want to display key an value
    //2==> put 2 spaces or "\t"
  );
  res.send("new user is created");
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id)); //"/:id"
  if (user) {
    res.status(201).send(user);
  } else {
    res.status(404).send("no such user available in your system");
  }
});

module.exports = router;
