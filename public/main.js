var app = angular.module('Pokestats', []);

app.controller('PokemonCtrl', ['$scope', '$http', function($scope, $http){
	$scope.pokemons = '';
	$scope.moves = '';
	$scope.ability = '';
	$scope.types = [
		"Normal",
		"Fire",
		"Water",
		"Electric",
		"Grass",
		"Ice",
		"Fighting",
		"Poison",
		"Ground",
		"Flying",
		"Psychic",
		"Bug",
		"Rock",
		"Ghost",
		"Dragon",
		"Dark",
		"Steel",
		"Fairy"
	];

	$http({
		method: 'GET',
		url: 'data/pokemon.json'
	}).success(function(data, status, headers, config) {
		$scope.pokemons = data;
		$scope.selectedPokemon = $scope.pokemons[0];
		console.log($scope.pokemons[0]);
	})

	$http({
		method: 'GET',
		url: 'data/move.json'
	}).success(function(data) {
		$scope.moves = data;
	});

	$http({
		method: 'GET',
		url: 'data/ability.json'
	}).success(function(data) {
		$scope.ability = data;
	});

	$scope.selectPokemon = function(pokemon) {
		$scope.selectedPokemon = pokemon;
		$scope.$apply();
	}

}])

app.directive('pokemon', function(){
	return {
		scope: true,
		link: function(scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {
				scope.selectPokemon(scope.pokemon);
			})
		}
	};
});

app.filter('regex', function() {
	return function(input, field, regex) {
		var patt = new RegExp(regex);      
		var out = [];
		for (var i = 0; i < input.length; i++){
			if(patt.test(input[i][field]))
			out.push(input[i]);
		}
		return out;
	};
});