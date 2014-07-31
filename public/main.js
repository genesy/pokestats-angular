var app = angular.module('Pokestats', []);

app.controller('PokemonCtrl', ['$scope', '$http', 'socket', function($scope, $http, socket){
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
		for (var property in data) {
			prop = data[property];
			$scope.pokemons.push(JSON.parse(prop));
			prop = JSON.parse(prop);
			if(prop.number==1) {
				$scope.selectedPokemon = prop;
				// console.log(prop);
				// $scope.selectPokemon(prop);
			}
		}
		// $scope.selectedPokemon = $scope.pokemons[0];
	})
}])


// app.config(['$routeProvider',function($routeProvider) {
// 	// $routeProvider.when('/pokemon/:')
// }])

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


app.factory('io', function ($rootScope) {
	return io;
});

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});