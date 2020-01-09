const express = require("express");

const server = express();

server.use(express.json());

const users = ["Pedro", "Thallys", "Joao", "Guilherme"];

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  // insomnia http://localhost:3000/users
  const { index } = req.params;

  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  // insomnia http://localhost:3000/users -> passando o nome em json

  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  // insomnia http://localhost:3000/users/1 -> passando o name em json

  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.json(users);
});

server.delete("/users/:index", (req, res) => {
  // insomnia http://localhost:3000/users/1

  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
