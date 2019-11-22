var express = require('express');
var app = express(); 
var router = express.Router();

// Setup the database and connect
var mongoose   = require('mongoose');
mongoose.set('useUnifiedTopology', true); // to avoid deprecation warning
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/parts'); // connect to our database

// Set up the model
var Schema       = mongoose.Schema;
var PartSchema   = new Schema({
	id: Number,
	name: String,
	qty: Number
});
var Part = mongoose.model('Part', PartSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to database");
});

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

router.use((req, res, next) => { // for all routes
  console.log('Request: ', req.method, ' Path: ', req.url, 'Time: ', Date.now());
  next(); // keep going
});

router.use(express.json());

router.get('/:id', function(req, res) {
	Part.findOne({id: req.params.id}, function (err, part) {
		console.log('ID: ' + req.params.id + ' Part: ' + part);
		if (err)
			res.send(err);
		res.json(part);
	});
});

// POST requires a parameter for now
router.post('/:id', function(req, res) {
	console.log('Data: ' + JSON.stringify(req.body));
	
	// merge existing object with given object using Object.assign()
	let data = Object.assign(db.get(req.params.id), req.body);
	db.set(req.params.id, data); // save the merged object
  res.send(JSON.stringify(data)); // return merged object
});

router.put('/:id', function(req, res) {
	console.log('Data: ' + JSON.stringify(req.body));
	var part = new Part();
	part.name = req.body.name;
	part.qty = req.body.qty;
	part.id = req.params.id
	part.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Part created! ' + part.name });
		console.log("Part created: " + part.name);
	})
});

app.use('/api', router); // Set the routes at '/api'

app.listen(8080); // start server
console.log('Listening on port 8080');
