# Store Manager API

The Store Manager API provides a way to keep track of items in a store and possibility for analytics to enable informed decisions to do with the store.

-----

## Technologies Used

- NodeJS
- ExpressJS
- SequelizeJS
- PostgreSQL

## How To Install And Run The Application

### Prerequisites

The following should be installed in your machine:

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download)

### Instructions

- Clone this Repo with `$ git clone https://github.com/MuhanguziDavid/store-manager-backend.git`
- Change into the directory of the project
- Use `$ npm install` to install all the dependencies of the project.
- Use `$ npm start` to start the application.
- Open http://127.0.0.1:8000/api/v1 in Postman an use the following endpoints.

-----

NB: No authentication is required for any of the endpoints :)

### Retrieve store items:

`GET /`

Returns an item

### Add store item:

`POST /items`

Example request body:

```source-json
{
  "artNumber": "s001",
  "color": "black",
  "description": "this is a samsung galaxy watch",
  "quantity": "10",
  "store": "ntinda"
}
```

Returns an item

Required fields: `all fields are required`

-----

## How To Contribute

### Issues

Issues are always very welcome. Please be sure to follow the [issue template](https://github.com/andela/engineering-playbook/issues/new).

### Pull requests

I am glad to get pull request if anything is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainer:

- Explain the issue that your PR is solving - or link to an existing issue
