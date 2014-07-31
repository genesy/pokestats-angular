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
		//if name doesn't have mega
		if( !a.name.match(/^Mega /) ) {
			client.set("pokemon:"+ a.number, JSON.stringify(a))
			console.log("stored pokemon:%s", a.number)
		} else {
			client.set("pokemon:"+ a.number +":mega", JSON.stringify(a))
			console.log("stored pokemon:%s:mega", a.number)
		}
	})


	data.forEach(function(a, b, c) {
		// a.number = a.number.toString();
		// if(a.number.length == 1) {
		// 	a.number = "00" + a.number 
		// }if(a.number.length == 2) {
		// 	a.number = "0" + a.number 
		// }
		// console.log(a.number);
		var isMega = false;
		if( a.name.match(/^Mega /) ) {
			isMega = true;
		}
		client.hset("pokemons", a.number + "-" + a.identifier, JSON.stringify({
			name: a.name,
			number: a.number,
			isMega: isMega
		}))

		client.hgetall("pokemons", function( err, data ) {
			if ( err ) {
				console.log("Error: " + err);
				return;
			}
		})
	})
})
