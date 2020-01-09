const express = require("express");

const server = express();

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Buscando usuario ${id}` });
});

server.listen(3000);
