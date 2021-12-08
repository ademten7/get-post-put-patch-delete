const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const data = fs.readFileSync(
  path.resolve(__dirname, "../models/db.json"),
  "utf-8"
);
//convert from JSON to JS
//after parse it is an abject and inside this object there is an users array. I assign this array
// to users
const users = JSON.parse(data).users;

//GET
router.get("/", (req, res) => {
  res.send(users);
});

//GET(dynamic params)
router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id)); //"/:id"
  if (user) {
    res.status(201).send(user);
  } else {
    res.status(404).send("no such user available in your system");
  }
});

//POST
router.post("/", (req, res) => {
  console.log(req.body);
  const user = users.find((user) => user.id === req.body.id);
  if (user) {
    res
      .status(404)
      .send("there is another user with same id! Please check infos again");
  } else {
    users.push(req.body);

    fs.writeFileSync(
      path.resolve(__dirname, "../models/db.json"),
      JSON.stringify({ users }, null, 2) //null ==>how we want to display key an value
      //2==> put 2 spaces or "\t"
    );
    res.send("new user is created");
  }
});

//PUT
router.put("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.avatar = req.body.avatar;
    user.address = req.body.address;
    res
      .status(201)
      .send(`Info  of ${user.first_name} ${user.last_name} is updated`);
    console.log(users);
    //we need to update  data.json file otherwise we update only local user.
    fs.writeFileSync(
      path.resolve(__dirname, "../models/db.json"),
      JSON.stringify({ users }, null, "\t")
    );
  } else {
    res.status(404).send("there is no such user in system");
  }
});

//PATCH
router.patch("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  const filteredUSers = users.filter(
    (user) => user.id === Number(req.params.id)
  );
  //   if (filteredUSers.length > 1) {
  //     let updatedFilteredUsers = filteredUSers.map((user, index) => {
  //       user.id = user.id + index;
  //       return { ...user, ...user.id };
  //     });
  //     const user = users.find((user) => user.id === Number(req.params.id));
  //     console.log(updatedFilteredUsers);
  //     const index = users.indexOf(user);
  //     console.log(index);
  //     users.splice(
  //       index,
  //       updatedFilteredUsers.length,
  //       Object.fromEntries(updatedFilteredUsers)
  //     );
  //     fs.writeFileSync(
  //       path.resolve(__dirname, "../models/db.json"),
  //       JSON.stringify({ users }, null, "\t")
  //     );
  if (user) {
    let updatedUser = { ...user, ...req.body };
    const index = users.indexOf(user);
    users.splice(index, 1, updatedUser);

    fs.writeFileSync(
      path.resolve(__dirname, "../models/db.json"),
      JSON.stringify({ users }, null, "\t")
    );
    // console.log(users);
    res
      .status(201)
      .send(`Info  of ${user.first_name} ${user.last_name} is updated`);
  } else {
    res.status(404).send("there is no such user in system");
  }
});

//DELETE
router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user) {
    const index = users.indexOf(user);
    users.splice(index, 1);
    fs.writeFileSync(
      path.resolve(__dirname, "../models/db.json"),
      JSON.stringify({ users }, null, 2)
    );
    res.status(201).send("user is deleted");
  } else {
    res.status(404).send("there is no such user in system");
  }
});

module.exports = router;
