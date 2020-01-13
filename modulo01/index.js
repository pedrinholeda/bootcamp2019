const express = require("express");

const server = express();

server.use(express.json());

const users = ["Pedro", "Thallys", "Joao", "Guilherme"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method}; URL: ${req.url}`);

  next();
  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User doesn't exists" });
  }
  req.user = user;
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  // insomnia http://localhost:3000/users

  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  // insomnia http://localhost:3000/users -> passando o nome em json

  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  // insomnia http://localhost:3000/users/1 -> passando o name em json

  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  // insomnia http://localhost:3000/users/1

  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
