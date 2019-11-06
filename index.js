var express = require('express');
var app = express(); 
var router = express.Router();

// Setup the database
const JSONdb = require('simple-json-db');
const db = new JSONdb('data/mydb.json');

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

router.use((req, res, next) => { // for all routes
  console.log('Request: ', req.method, ' Path: ', req.url, 'Time: ', Date.now());
  next(); // keep going
});

router.use(express.json());

router.get('/:id', function(req, res) {
	let data = JSON.stringify(db.get(req.params.id)); // query db
	console.log('ID: ' + req.params.id + ' Data: ' + data);
  res.send(data); // return data
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
	db.set(req.params.id, req.body); // save data with :id as the key
  res.send(JSON.stringify(req.body));
});

app.use('/api', router); // Set the routes at '/api'

app.listen(8080); // start server
console.log('Listening on port 8080');
