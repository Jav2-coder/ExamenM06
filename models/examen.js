// JSON que conté la estructura del nostre objecte

var db = require("../db");

var Examen = db.model('Examen', {
    
            isbn: {
                type: String,
                required: true,
                unique: true
            },
            
            titol: {
                type: String,
                required: true
            },
            
            autors: {
                type: [String]
            },
            
            data: {
                type: Date,
                required: true,
                default: Date.now
            }
    });

module.exports = Examen;