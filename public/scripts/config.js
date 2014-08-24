'use strict';
angular.module('Pokestats.config', [])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:"partials/welcomeView"
		})
		.when('/pokemon/:pokemonNumber', {
			templateUrl:"partials/pokemonView"
		})
})