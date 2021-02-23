const express = require("express");
const authRouter = require('../api/auth/auth-router');
const userRouter = require('../api/users/users.router');
const server = express();

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.json("The Server is up and running!");
});

module.exports = server;
