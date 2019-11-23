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
		console.log(`Found part ${req.params.id} with values: ${part}`);
		if (err)
			res.status(500).send(err);
		else
			res.json(part);
	});
});

// POST requires a parameter for now
router.post('/:id', function(req, res) {
	console.log(`POST data: ${JSON.stringify(req.body)}`);
	Part.findOne({id: req.params.id}, function (err, part) {
		if (err) { // server error
			console.log(`Error while searching for part ${req.params.id}: ${err}`);
			res.status(500).send(err);
		} else { // found it!
			console.log(`Found part ${req.params.id} with values: ${part}`);
			if (part === null) {
				console.log(`Part ${req.params.id} not found. Creating new part`);
				part = {id: req.params.id}; // make a new array if part not found
			}
			// combine new and old parts and merge it with a new Part model
			let newpart = Object.assign(new Part(), part, req.body);
			console.log(`Part name:${newpart.name}, qty: ${newpart.qty}, id: ${newpart.id}`);
			newpart.save(function(err) {		// Save the part in database
				if (err) {	// server error
					console.log(`Save error part: ${req.params.id} - ${err}`);
					res.status(500).send(err);
				} else {
					res.json({ message: `Part updated: ${newpart.name}` });
					console.log(`Part updated: ${newpart.name}`);
				}
			});		
		}
	});
});

router.put('/:id', function(req, res) {
	console.log(`PUT Data: ${JSON.stringify(req.body)}`);
	var part = new Part();
	part.name = req.body.name;		// Get part properties from submitted data
	part.qty = req.body.qty;
	part.id = req.params.id			// Part ID is from URL parameter
	part.save(function(err) {		// Save the part in database
		if (err) {	// server error
			console.log(`Save error part: ${req.params.id} - ${err}`);
			res.status(500).send(err);
		} else {
			res.json({ message: `Part created: ${part.name}` });
			console.log(`Part created: ${part.name}`);
		}
	});
});

app.use('/api', router); // Set the routes at '/api'

app.listen(8080); // start server
console.log('Listening on port 8080');
