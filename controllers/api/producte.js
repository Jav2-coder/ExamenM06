var Producte = require("../../models/producte");
var router = require("express").Router();
router.get("/", function(req, res, next) {
    Producte.find()
            .exec(function(err, producte) {
        if (err) {
            return next(err);
        }
        res.json(producte);
    });
    
});

router.get("/seccio/:id", function(req, res, next) {
   var id = req.params.seccio;
   Producte.find({
       'seccio': id
   }).exec(function(err, producte) {
       if (err) {
           return next(err);
       }
       res.json(producte);
   });
});

router.get("/preu/:id", function(req, res, next) {
   var id = req.params.preu;
   Producte.find({
       'preu': id
   }).exec(function(err, producte) {
       if (err) {
           return next(err);
       }
       res.json(producte);
   });
});

router.post("/", function (req,res,next) {
    var producte = new Producte({
        "codi" : req.body.codi,
        "nom": req.body.nom,
        "seccio": req.body.seccio,
        "preu": req.body.preu
    });
    console.log(producte);
    producte.save(function(err, producte) {
        if (err) { return next(err) }
        res.status(201).json(producte);
    });
});

module.exports = router;