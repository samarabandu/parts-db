# Parts DB

Node.js script for a simple ReST API that provides following verb+noun combinations.

1. `GET /api/id` - Return stored data with matching 'id'.
2. `PUT /api/id` - Create a new record (replaces any existing record).
3. `POST /api/id` - Merge the data provided with the existing data.

Data is sent or received as JSON objects.

## Branches

There are four branches: `master`, `prot-easy`, `prot-auth` and `mongo`

## Branch `master`

ReST API using `simple-json-db` as the database (save JSON objects in a file). 

## Branch `prot-easy`

Adds authorization using JWT to the PUT route. Use jwt.io website to generate a token and add this as a bearer token with a PUT request to `/api/id`. E.g. Add the header `Authorization: Bearer xxx.yyy.zzz` where `xxx.yyy.zzz` is the token generated on jwt.io. Set the environment variable `JWT_KEY` with the secret that was used to create the token on jwt.io and start the server. E.g. 

```bash
JWT_KEY="mysecret" node index
```

## Branch `prot-auth`

Adds two endpoints, one for creating a user account and one for validating a username/password pair.

1. `PUT /auth/new` - Create an account with a username/password pair sent in the body as `{user: foo, pwd: bar}`.

2. `POST /auth/validate` - Validate credentials and issue a token. Credentials are sent in the body as `{user: foo, pwd: bar}`. A JWT token is returned if authentication is successful. To test the token, copy the token from response and use it to create an authorization header (see `prot-easy` above). Start the server as in branch `prot-easy`.

# Branch `mongo`

Uses MongoDB instead of `simple-json-db` as the storage back-end. Assumes the database is on `localhost:27017` 

## Installation

Clone the repository, and install dependencies:

```bash
npm install
```

## Usage

Start the server

```bash
node index
```
or for authentation/authorization

```bash
JWT_KEY="mysecret" node index
```

Send requests to `localhost:8080/api`

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Author
Jagath Samarabandu <jagath@uwo.ca>
