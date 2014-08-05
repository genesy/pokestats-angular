'use strict';
angular.module('Pokestats.directives', ['Pokestats.factories'])
.directive('pokemon', ['getType', function(getType) {
	return {
		scope: true,
		link: function(scope, iElm, iAttrs, controller) {
			iElm.on('click', function() {
				console.log(scope.pokemon);
				scope.selectPokemon(scope.pokemon);
			})
		}
	};
}])
.directive('type', ['getType', '$compile', function(getType, $compile) {

	return {
		scope:{
			type: "="
		},
		replace: true,
		link: function(scope, iElm, iAttrs, controller) {
			var newHTML = '';
			if(typeof scope.type === "object") {
				for ( var i = 0; i< scope.type.length ; i++ ) {
					// console.log(scope.type[i]);
					var newType = getType(scope.type[i]);
					newHTML += '<span class="pkmn-type btn type-'+ newType.toLowerCase() +'">' + newType + '</span>'
				}
				if(scope.type.length === 2) {
					// newHTML = '<div class="pkmn-types">'+
					// '<span class="pkmn-type type-' + newType
				}
				iElm.html(newHTML).show();
				// iElm.html('<span class="pkmn-type type-'+newtype.toLowerCase()+'">'+newtype+'</span>').show();
				$compile(iElm.contents())(scope);
			}
		}
	}
}])

// DOM MANIPULATION

.directive('pokemon-list', function($window) {
	var uniqueID = 1;
	return {
		restrict: 'A',
		scope: true,
		// template:
		link: function(scope, elem, attrs) {
			console.log($window);
		}
	}
})