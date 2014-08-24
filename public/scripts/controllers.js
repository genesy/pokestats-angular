'use strict';
angular.module('Pokestats.controllers', [])
.controller('PokemonCtrl', PokemonCtrl);
PokemonCtrl.$inject = ['$scope','$http', 'socket', '$window', '$routeParams', '$location'];
function PokemonCtrl($scope, $http, socket, $window, $routeParams, $location){
	$scope.pokemons = [];
	$scope.moves = '';
	$scope.ability = '';
	$scope.selectedPokemon =[];
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

	$scope.search = function() {
		
	}
	$scope.selectPokemon = function(pokemon) {
		$location.path('/pokemon/' + pokemon.identifier)
		socket.emit("getPokemon", pokemon)
	}

	socket.on("returnPokemon", function( data ){
		data = JSON.parse(data);
		$scope.selectedPokemon = data;
		console.log(data);
		$scope.selectedPokemon.spriteUrl =  "img/sprites/m/" + $scope.selectedPokemon.number + ".png";
		if($scope.selectedPokemon.name.match(/^Mega /)) {
			$scope.selectedPokemon.isMega = 1;
			var xyurl = $scope.selectedPokemon.identifier
				.replace("-mega","")
				.replace("-x","x")
				.replace("-y","y");
			$scope.selectedPokemon.spriteUrl =  "img/sprites/mega/" + xyurl + ".png";
		}
		console.log($scope.selectedPokemon);
	});

	socket.on("get_all_pokemons", function( data ) {
		for (var property in data) {
			var prop = JSON.parse(data[property]);
			$scope.pokemons.push(prop);
			if(prop.identifier == $routeParams.pokemonIdentifier) {
				$scope.selectPokemon(prop);
			}
		}
	})
}