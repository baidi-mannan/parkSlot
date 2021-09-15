const express = require('express');

const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hola", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const API= require("./api/api");
app.use('/api',API);






app.listen(5000,()=>console.log("Listening to 5000"))