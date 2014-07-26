var app = angular.module('Pokestats', function() {
	app.controller('PokemonCtrl', ['$scope', function($scope){
		$scope.pokemons = $http({
			method: 'GET',
			url: 'data/poke.json'
		}).success(function(data, status, headers, config) {
			console.log(data);
		})
	}])
})