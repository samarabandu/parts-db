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

### Master branch

Contains basic ReST API
Start the server
```bash
node index
```

Send requests to `localhost:8080/api`

### Branch: prot-easy

Includes simple authorization uwing JWT for the PUT route on /api/:id. To test, start the server with password set in the env. variable JWT_KEY.
```bash
JWT_KEY="se3316" node index
```

JWT token has following header and payload and signed with secret "se3316".
```javascript
{
  "alg": "HS256",
  "typ": "JWT"
}

{
  "sub": "jagath",
  "admin": "0"
}
```
Add the following header to the requests in the ReST client.
```
Authoriation: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWdhdGgiLCJhZG1pbiI6IjAifQ._dtK-a4uWc9_dqkHM5yUxUzpnwIMLpNVfQSGynOvIxI
```
## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Jagath Samarabandu <jagath@uwo.ca>