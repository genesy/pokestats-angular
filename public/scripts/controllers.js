'use strict';
angular.module('Pokestats.controllers', ['Pokestats.factories'])
.controller('PokemonCtrl', PokemonCtrl);
PokemonCtrl.$inject = ['$scope','$http', 'socket'];
function PokemonCtrl($scope, $http, socket){
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


	$scope.selectPokemon = function(pokemon) {
		console.log(pokemon);
		socket.emit("getPokemon", pokemon)
	}

	socket.on("returnPokemon", function( data ){
		data = JSON.parse(data);
		console.log(data);
		$scope.selectedPokemon = data;
	});

	socket.on("get_all_pokemons", function( data ) {
		console.log(data);;
		for (var property in data) {
				var prop = data[property];
				$scope.pokemons.push(JSON.parse(prop));
				prop = JSON.parse(prop);
				if(prop.number==1) {
					// $scope.selectedPokemon = prop;
					// console.log(prop);
					$scope.selectPokemon(prop);
				}
		}
		// $scope.selectedPokemon = $scope.pokemons[0];
	})
}