var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')();
io.listen(server);
var redis = require('redis');
server.listen(8080);
app.use(express.static(__dirname + '/public'));
app.get('/', function( req, res ) {
	res.render('index.html');
})


var client = redis.createClient();


io.on("connection", function(socket) {
	console.log('connection');
	client.hgetall("pokemons", function( err, obj ) {
		if( err ) {
			console.log(err);
		}
		socket.emit("get_all_pokemons", obj);
	});

	socket.on("getPokemon", function( data ) {
		isMega = "";
		xy = "";
		if(data.isMega) {
			isMega = ":mega"
			var xy = data.identifier.match(/-[x|y]$/);
			if(xy) {
				xy = xy[0]
			} else {
				xy = "";
			}
		}

		client.get("pokemon:"+ data.number + isMega + xy, function ( err, data ) {
			socket.emit("returnPokemon", data);
		})
	})
})

console.log('localhost:8080')


