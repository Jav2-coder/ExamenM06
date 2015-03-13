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

router.put("/:id", function(req, res, next) {
    var id = req.params.id;
    Producte.findOne({
        'codi': id
    }, function(err, producte) {
        if (err) return next(err);
        if (!producte) res.status(403).json({
            "missatge": "Error: El producto buscado no existe!"
        });
        Producte.findByIdAndUpdate(producte._id, req.body, function(err) {
            if (err) return next(err);
            res.status(201).json({
                "missatge": "Actualizado!"
            });
        });
    });
});

router.delete("/:id", function(req, res, next) {
    var id = req.params.id;
    
    var query = Producte.findOne({
        'codi': id
    });
    console.log(id);
    query.exec(function(err, producte) {
        if (err) return handleError(err);
        if (producte == null) return res.send("No existe!");

        producte.remove(function(err) {
            if (err) {
                console.log(err);
            }
            res.send("Producte eliminat!");
        });
    });
});

module.exports = router;