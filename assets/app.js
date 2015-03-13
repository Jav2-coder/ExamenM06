var app = angular.module('appLearn', []);

app.controller('ProductesController', function($scope, ProductesService) {
    ProductesService.fetch()
        .success(function(productes) {
            $scope.productes = productes;
        })
        .error(function(e) {
            console.log(e);
        });
        
    $scope.afegirProducte = function() {

        if (($scope.nomProducte != undefined) & ($scope.codiProducte != undefined) & ($scope.producteSeccio != undefined) & ($scope.productePreu != undefined)) {

            ProductesService.create({
                "nom": $scope.nomProducte,
                "codi": $scope.codiProducte,
                "seccio": $scope.producteSeccio,
                "preu": $scope.productePreu
            }).success(function(producte) {
                $scope.productes.unshift(producte);
                $scope.nomProducte = null;
                $scope.codiProducte = null;
                $scope.producteSeccio = null;
                $scope.productePreu = null;
            });
        }
    };
    
    $scope.cancelarProducte = function(producte) {

        if (($scope.nomProducte != undefined) & ($scope.codiProducte != undefined) & ($scope.producteSeccio != undefined) & ($scope.productePreu != undefined)) {
            
            $scope.nomProducte = null;
            $scope.codiProducte = null;
            $scope.producteSeccio = null;
            $scope.productePreu = null;
            
        }
    };
    
    $scope.borrarProducte = function(producte) {

        ProductesService.delete(producte.codi)
            .success(function() {
                $scope.productes.splice($scope.productes.indexOf(producte), 1);
            });

    };
    
     $scope.editarProducte = function(producte) {

        $scope.nomEditat = producte.nom;
        $scope.codiEditat = producte.codi;
        $scope.seccioEditat = producte.seccio;
        $scope.preuEditat = producte.preu;

        $scope.producte_Editar = producte;


    };
    
    $scope.actualitzarProducte = function() {

        if (($scope.nomEditat != undefined) & ($scope.codiEditat != undefined) & ($scope.seccioEditat != undefined) & ($scope.preuEditat != undefined)) {

            ProductesService.update($scope.producte_Editar.codi, {
                    "nom": $scope.nomEditat,
                    "codi": $scope.codiEditat,
                    "seccio": $scope.seccioEditat,
                    "preu": $scope.preuEditat
                })
                .success(function() {
                    $scope.producte_Editar.nom = $scope.nomEditat;
                    $scope.producte_Editar.codi = $scope.codiEditat;
                    $scope.producte_Editar.seccio = $scope.seccioEditat;
                    $scope.producte_Editar.preu = $scope.preuEditat;
                   
                    $scope.nomEditat = null;
                    $scope.codiEditat = null;
                    $scope.seccioEditat = null;
                    $scope.preuEditat = null;
                    
                });
        }
    };
    
    $scope.cancelarEdicio = function(producte) {

        if (($scope.nomEditat != undefined) & ($scope.codiEditat != undefined) & ($scope.seccioEditat != undefined) & ($scope.preuEditat != undefined)) {

            $scope.nomEditat = null;
            $scope.codiEditat = null;
            $scope.seccioEditat = null;
            $scope.preuEditat = null;
            
        }
    };

});

app.service("ProductesService", function($http) {
    this.fetch = function() {
        return $http.get("/api/producte");
    };
    this.fetchSeccio = function(seccio) {
        return $http.get("/api/producte/seccio/" + seccio);
    };
    this.fetchPreu = function(preu) {
        return $http.get("/api/producte/preu/" + preu);
    };
    this.create = function(producte) {
        return $http.post("/api/producte", producte);
    };
    this.delete = function(codi) {
        return $http.delete("/api/producte/" + codi);
    };
    this.update = function(codi, producte) {
        return $http.put("/api/producte/" + codi, producte);
    };
});