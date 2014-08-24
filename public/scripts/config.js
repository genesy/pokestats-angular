'use strict';
angular.module('Pokestats.config', [])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl:"partials/welcomeView"
		})
		.when('/pokemon/:pokemonIdentifier', {
			templateUrl:"partials/pokemonView"
		});
	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');
})