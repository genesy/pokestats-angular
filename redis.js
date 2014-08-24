var redis = require('redis');
var fs = require('fs');
// client = redis.createClient(6379 || 18267);
client = redis.createClient();


var pokemon = __dirname + '/public/data/pokemon.json';

fs.readFile(pokemon, 'utf8', function(err, data) {
	if( err ) {
		console.log('Error : ' + err);
		return;
	}

	data = JSON.parse(data);
	data.forEach(function(a, b, c) {
		if( !a.name.match(/^Mega /) ) {
			client.set("pokemon:"+ a.number, JSON.stringify(a))
			// console.log("stored pokemon:%s", a.number)
		} else {
			var xy = a.identifier.match(/-[x|y]$/);
			if(!xy) {
				xy = "";
			} else {
				xy = xy[0];
			}
			client.set("pokemon:"+ a.number +":mega"+xy, JSON.stringify(a))
			console.log("stored pokemon:%s:mega", a.number)
		}
	})


	data.forEach(function(a, b, c) {
		var isMega = false;
		if( a.name.match(/^Mega /) ) {
			isMega = true;
		}
		client.hset("pokemons", a.number + "-" + a.identifier, JSON.stringify({
			name: a.name,
			number: a.number,
			isMega: isMega,
			types: a.types,
			identifier: a.identifier
		}))

		client.hgetall("pokemons", function( err, data ) {
			if ( err ) {
				console.log("Error: " + err);
				return;
			}
		})
	})
	console.log('done');
})
