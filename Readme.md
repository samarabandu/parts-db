# Parts DB

Node.js script for a simple ReST API that provides following verb+noun combinations.

1. GET /api/id - Return stored data with matching 'id'.
2. PUT /api/id - Create a new record (replaces any existing record).
3. POST /api/id - Merge the data provided with the existing data.

Data is sent or received as JSON objects.

## Branches

There are three branches: `master`, `prot-easy` and `mongo`

## Branch `master`

ReST API using `simple-json-db` as the database (save JSON objects in a file).

## Branch `prot-easy`

Adds a authorization using JWT to the PUT route. Use jwt.io website to generate a token and add this as a bearer token with the PUT request. E.g. Add the header "Authorization: Bearer xxx.yyy.zzz" where `xxx.yyy.zzz` is the token generated on jwt.io.

## Branch `prot-auth`

Adds two endpoints, `PUT /auth/new` for making a username/password entry and `POST /auth/validate` for obtaining a token. For both endpoints, credentials are sent in the body as `{user: foo, pwd: bar}`. For the latter, a JWT token is returned.

To test the token, copy the token from response and use it to create an authorization header (see `prot-easy` above).

# Branch `mongo`

Uses MongoDB instead of `simple-json-db` as the storage back-end. Assumes the database is on `localhost:27017` 

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
