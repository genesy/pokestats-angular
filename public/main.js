var app = angular.module('Pokestats', []);

app.controller('PokemonCtrl', ['$scope', '$http', function($scope, $http){
	$scope.pokemons = '';
	$scope.types = '';
	$http({
		method: 'GET',
		url: 'data/pokemon.json'
	}).success(function(data, status, headers, config) {
		$scope.pokemons = data;
		
	})
}])