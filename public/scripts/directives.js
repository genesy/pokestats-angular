'use strict';
angular.module('Pokestats.directives', []).
directive('pokemon', function() {
	return {
		scope: true,
		link: function(scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {
				scope.selectPokemon(scope.pokemon);
			})
		}
	};
})
.directive('type', function(a) {
	return {
		scope:true,
		link: function(scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {
				scope.selectPokemon(scope.pokemon);
			})
			console.log(scope, a);
		}
	}
})