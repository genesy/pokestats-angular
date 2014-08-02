'use strict';
angular.module('Pokestats.controllers', ['Pokestats.factories'])
.controller('PokemonCtrl', PokemonCtrl);
PokemonCtrl.$inject = ['$scope','$http', 'socket', '$window'];
function PokemonCtrl($scope, $http, socket, $window){
	$scope.pokemons = [];
	$scope.moves = '';
	$scope.ability = '';
	$scope.selectedPokemon =[];
	console.log($window);
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
		socket.emit("getPokemon", pokemon)
	}

	socket.on("returnPokemon", function( data ){
		data = JSON.parse(data);
		$scope.selectedPokemon = data;
	});

	socket.on("get_all_pokemons", function( data ) {
		for (var property in data) {
				var prop = data[property];
				$scope.pokemons.push(JSON.parse(prop));
				prop = JSON.parse(prop);
				if(prop.number==1) {
					$scope.selectPokemon(prop);
				}
		}
	})
}