var express = require('express');
var app = express(); 
var router = express.Router();

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

router.use((req, res, next) => { // for all routes
  console.log('Request: ', req.method, ' Path: ', req.url, 'Time: ', Date.now());
  next(); // keep going
});

router.get('/:id', function(req, res) { // 
  res.send('Got a GET request for /api with ' + req.params.id);
});

router.post('/', function(req, res) {
  res.send('Got a POST request for /api');
});

router.put('/:id', function(req, res) {
  res.send('Got a POST request for /api with ' + req.params.id);
});

app.use('/api', router); // Set the routes at '/api'

app.listen(8080); // start server
console.log('Listening on port 8080');
