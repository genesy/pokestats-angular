var express = require('express');

var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')();
var redis = require('redis');

io.listen(server);

var prod = {
	server: 24268,
	redis: 18267
}

var local = {
	server:8080,
	redis:6379
}


var port = local;
// var port = prod;

server.listen(port.server)


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
	res.render('index',
	{ title : 'Home' }
	)
})

app.get('/partials/:name', function(req, res) {
	var name = req.params.name;
	res.render('partials/' + name)
})

var client = redis.createClient(port.redis);


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


