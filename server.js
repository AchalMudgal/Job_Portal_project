const express = require("express");
const app = express();

const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose = require("mongoose");

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("Error while connecting to the db");
});
db.once("open", ()=>{
    console.log("Connected to the mongodb");
});


app.listen(serverConfig.PORT, ()=>{
    console.log("Server running at port :",serverConfig.PORT);
});