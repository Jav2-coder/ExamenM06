// Sever de la meva API, on declarem les rutes dels nostres arxius js

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/api/examen", require("./controllers/api/examen"));
app.use("/",require("./controller/static"));

app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});