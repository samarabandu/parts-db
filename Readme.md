# Parts DB

Node.js script for a simple ReST API that provides following verb+noun combinations. It uses simple-json-db as the database (save JSON objects in a file).

1. GET /api/id - Return stored data with matching 'id'.
2. PUT /api/id - Create a new record (replaces any existing record).
3. POST /api/id - Merge the data provided with the existing data.

Data is sent or received as JSON objects.

## Installation

Unpack the zip file on to a folder. Install dependencies:

```bash
npm install
```

## Usage

Start the server
```bash
node index
```

Send requests to `localhost:8080/api`

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Jagath Samarabandu <jagath@uwo.ca>