var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/api/producte", require("./controllers/api/producte"));
app.use("/",require("./controllers/static"));

app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});