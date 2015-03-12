var mongoose = require("mongoose");
mongoose.connect("mongodb://surrui:patata@ds043037.mongolab.com:43037/examen", function() {
    console.log('Connectat a mongodb');
});

module.exports = mongoose;