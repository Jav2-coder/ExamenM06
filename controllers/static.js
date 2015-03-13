var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/api/llibres", require("./controller/api/llibres"));
app.use("/",require("./controller/static"));

app.listen(process.env.PORT, function() {
    console.log('Server listening on', process.env.PORT);
});