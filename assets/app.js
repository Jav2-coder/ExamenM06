var app = angular.module('appLearn', []);

app.controller('LlibresController', function($scope, LlibresService) {
    LlibresService.fetch()
        .success(function(llibres) {
            $scope.llibres = llibres;
        })
        .error(function(e) {
            console.log(e);
        });

    $scope.afegirLlibre = function() {

        if (($scope.llibreTitol != undefined) & ($scope.llibreIsbn != undefined)) {

            LlibresService.create({
                "titol": $scope.llibreTitol,
                "isbn": $scope.llibreIsbn
            }).success(function(llibre) {
                $scope.llibres.unshift(llibre);
                $scope.llibreIsbn = null;
                $scope.llibreTitol = null;
            });
        }
    };

    $scope.borrarLlibre = function(llibre) {

        LlibresService.delete(llibre.isbn)
            .success(function() {
                $scope.llibres.splice($scope.llibres.indexOf(llibre), 1);
            });

    };

    $scope.editarLlibre = function(llibre) {

        $scope.editarTitol = llibre.titol;
        $scope.editarIsbn = llibre.isbn;

        $scope.llibre_Editar = llibre;



    };

    $scope.actualitzarLlibre = function() {

        if (($scope.editarTitol != undefined) & ($scope.editarIsbn != undefined)) {

            LlibresService.update($scope.llibre_Editar.isbn, {
                    "titol": $scope.editarTitol,
                    "isbn": $scope.editarIsbn
                })
                .success(function() {
                    $scope.llibre_Editar.isbn = $scope.editarIsbn;
                    $scope.llibre_Editar.titol = $scope.editarTitol;
                   
                    $scope.editarIsbn = null;
                    $scope.editarTitol = null; 
                    
                });
        }
    };
});

app.service("LlibresService", function($http) {
    this.fetch = function() {
        return $http.get("/api/llibres");
    };
    this.create = function(llibre) {
        return $http.post("/api/llibres", llibre);
    };
    this.delete = function(isbn) {
        return $http.delete("/api/llibres/" + isbn);
    };

    this.update = function(isbn, llibre) {
        return $http.put("/api/llibres/" + isbn, llibre);
    };
});