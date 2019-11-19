var express = require('express');
var app = express(); 
var router = express.Router();

// Setup the database
const JSONdb = require('simple-json-db');
const db = new JSONdb('data/mydb.json');

// Use JWT
const jwt = require('jsonwebtoken');

// Don't put the secret inside any code file as it will get stored in your repository
const secret = process.env.JWT_KEY; // Instead, get it from env variable
if (typeof secret === 'undefined') { // If not set, exit immediately
	console.log("Please set secret as environment variable. E.g. JWT_KEY=\"Open Sesame\" node index");
	process.exit(1);
}

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
	console.log("Auth: " + req.headers.authorization);
	// Extract token from Authorization header. It should be of the form "Bearer xxx.yyy.zzz"
	// Split on whitespace to get {"Bearer", "xxx.yyy.zzz"}

	if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
	}

	try {
		// Verify the token
		const payload = jwt.verify(token[1], secret);
		console.log("JWT: ", JSON.stringify(payload));
		db.set(req.params.id, req.body); // save data with :id as the key
		res.send(JSON.stringify(req.body));	  
	  } catch (ex) {
		//if invalid token
		return res.status(400).send("Access denied. Invalid token.");
	  }
});

app.use('/api', router); // Set the routes at '/api'

app.listen(8080); // start server
console.log('Listening on port 8080');
