const express = require("express");
require("./model/config");
const routers = require("./router/mainRouter");
require("dotenv").config();
const app = express();
const service = require("./service/mailService");


app.use(express.json()); 

app.use("/", routers); 

const server = app.listen(9000, () => {
    console.log(`server runs at ${process.env.PORT}`);
  });
  
module.exports = server;
