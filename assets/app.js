var app = angular.module('appLearn', []);

app.controller('ProductesController', function($scope, ProductesService) {
    ProductesService.fetch()
        .success(function(productes) {
            $scope.productes = productes;
        })
        .error(function(e) {
            console.log(e);
        });
    
    $scope
    
    $scope.afegirProducte = function() {

        if (($scope.nomProducte != undefined) & ($scope.codiProducte != undefined) & ($scope.seccioProducte != undefined) & ($scope.preuProducte != undefined)) {

            ProductesService.create({
                "nom": $scope.nomProducte,
                "codi": $scope.codiProducte,
                "seccio": $scope.seccioProducte,
                "preu": $scope.preuProducte
            }).success(function(producte) {
                $scope.productes.unshift(producte);
                $scope.nomProducte = null;
                $scope.codiProducte = null;
                $scope.seccioProducte = null;
                $scope.preuProducte = null;
            });
        }
    };
    
    $scope.cancelarProducte = function(producte) {

        if (($scope.nomProducte != undefined) & ($scope.codiProducte != undefined) & ($scope.seccioProducte != undefined) & ($scope.preuProducte != undefined)) {
            $scope.productes.unshift(producte);
            $scope.nomProducte = null;
            $scope.codiProducte = null;
            $scope.seccioProducte = null;
            $scope.preuProducte = null;
            
        }
    };

});

app.service("ProductesService", function($http) {
    this.fetch = function() {
        return $http.get("/api/producte");
    };
    this.fetch = function(seccio) {
        return $http.get("/api/producte/seccio/" + seccio);
    };
    this.fetch = function(preu) {
        return $http.get("/api/producte/preu/" + preu);
    };
    this.create = function(producte) {
        return $http.post("/api/producte", producte);
    };
});