//Zona del nostre codi on tenim el controlador i les nostres funcions.

var app = angular.module('appLearn', []);

//Creem el controlador
app.controller('LlibresController', function($scope, LlibresService) {
    LlibresService.fetch()
        .success(function(llibres) {
            $scope.llibres = llibres;
        })
        .error(function(e) {
            console.log(e);
        });
    //Desenvolupem la funcio afegirLlibre
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

     //Desenvolupem la funcio esborrar llibre
    $scope.borrarLlibre = function(llibre) {

        LlibresService.delete(llibre.isbn)
            .success(function() {
                $scope.llibres.splice($scope.llibres.indexOf(llibre), 1);
            });

    };
    
    //Cancelem l'acció POST
    $scope.cancelarLlibre = function(llibre) {

        if (($scope.llibreTitol != undefined) & ($scope.llibreIsbn != undefined)) {
            
            $scope.llibreIsbn = null;
            $scope.llibreTitol = null; 
            
        }
    };
    
    //Cancelem l'acció PUT
    $scope.cancelarEdicio = function(llibre) {

        if (($scope.editarTitol != undefined) & ($scope.editarIsbn != undefined)) {
            
            $scope.editarIsbn = null;
            $scope.editarTitol = null; 
            
        }
    };

    // Traspassem informació a les variables del HTML
    $scope.editarLlibre = function(llibre) {

        $scope.editarTitol = llibre.titol;
        $scope.editarIsbn = llibre.isbn;

        $scope.llibre_Editar = llibre;


    };

    
    // Actualitzem les dades del llibre a editar
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

// Creem el nostre service, on tindrem creades la nostra llista de funcions (post, put, get, delete).
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
    // Li passem un json i el id del llibre que volem editar
    this.update = function(isbn, llibre) {
        return $http.put("/api/llibres/" + isbn, llibre);
    };
});