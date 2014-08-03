'use strict';
angular.module('Pokestats.factories', [])
.factory('io', function ($rootScope) {
	return io;
})
// .factory('getType', ['$rootScope', '$scope', function($rootScope, $scope){
// 	return function name(){

// 	};
// }])
.factory('getType', function ($rootScope) {
	return function(typeId) {
		var types = [
			"Normal", //0
			"Fighting", //1
			"Flying", //2
			"Poison", //3
			"Ground", //4
			"Rock", //5
			"Bug", //6
			"Ghost", //7
			"Steel", //8
			"Fire", //9
			"Water", //10
			"Grass", //11
			"Electric", //12
			"Psychic",
			"Ice",
			"Dragon",
			"Dark",
			"Fairy"
		];
		return types[typeId];
	}
})
.factory('socket', function ($rootScope) {
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
})
