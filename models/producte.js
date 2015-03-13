var db = require("../db");

var Producte = db.model('Producte', {
    
            codi: {
                type: String,
                required: true,
                unique: true
            },
            
            nom: {
                type: String,
                required: true
            },
            
            seccio: {
                type: String,
                required: true,
            },
            
            preu: {
                type: String,
                required: true
            }
    });

module.exports = Producte;