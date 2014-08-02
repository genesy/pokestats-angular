var redis = require('redis');
var fs = require('fs');
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
			console.log("stored pokemon:%s", a.number)
		} else {
			client.set("pokemon:"+ a.number +":mega", JSON.stringify(a))
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
			types: a.types
		}))

		client.hgetall("pokemons", function( err, data ) {
			if ( err ) {
				console.log("Error: " + err);
				return;
			}
		})
	})
})
