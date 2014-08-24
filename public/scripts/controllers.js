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

	// if($routeParams.pokemonNumber) {
	// 	$scope.selectPokemon()
	// }
	$scope.selectPokemon = function(pokemon) {
		$location.path('/pokemon/' + pokemon.number)
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
			var prop = data[property];
			$scope.pokemons.push(JSON.parse(prop));
			prop = JSON.parse(prop);
			if(prop.number == $routeParams.pokemonNumber) {
				$scope.selectPokemon(prop);
			}
			if(prop.number==1 && !$routeParams.pokemonNumber) {
				$scope.selectPokemon(prop);
			}
		}
	})
}