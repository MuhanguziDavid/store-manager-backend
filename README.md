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

`GET /items` could add a query e.g. `GET /?artNumber=s001&color=black` to return only black items of artNumber s001

Returns store items

NB: description search uses keywords (you dont have to enter the whole description)

### Retrieve single store item:

`GET /items/:artNumber`

Returns a single store item

### Add store item:

`POST /items`

Example request body:

```source-json
{
  "artNumber": "s001",
  "color": "black",
  "description": "this is a samsung galaxy watch",
  "quantity": "10",
  "storeId": 3
}
```

Returns an item

Required fields: `all fields are required`

NB: If an item with the same `artNumber`, `color`, `description`, and `store` already exists, the quantity of the posted and existing items will be added and left as one item.

### Edit store item:

`PUT /items:id`

Example request body:

```source-json
{
  "artNumber": "s001",
  "color": "black",
  "description": "this is a samsung galaxy watch",
  "quantity": "10",
  "storeId": 3
}
```

Returns an edited item

Required fields: `none of the field is required. Only enter the field you want to edit`

### Delete store item:

`DELETE /items:id`

Returns a message saying that the item was successfully deleted

NB: Deleting an item will delete all checkouts related to the item

### Checkout item:

`POST /checkout`

Example request body:

```source-json
{
  "collector": "David",
  "quantity": "1"
}
```

Returns a checked out item

Required fields: `all fields are required`

NB: The quantity of the item in the items table is deducted by the quantity checked out.

### Create Store:

`POST /store`

Example request body:

```source-json
{
  "store": "luzira"
}
```

Returns a created store

Required fields: `all fields are required`

### Get Stores:

`GET /store`

Returns all stores

### Edit Store:

`PUT /store/:id`

Example request body:

```source-json
{
  "store": "luzira"
}
```

Returns an edited store

Required fields: `all fields are required`

### Delete Store:

`POST /store/:id`

Returns a message saying that the store was successfully deleted

NB: Deleting a store will delete all items and checkouts related to it

### Generate Cehckout Report:

`GET /reports`

always add a `startDate` and `endDate` as url query e.g. `GET /reports?startDate=2019-10-15T00:05:32.000Z&endDate=2019-11-07T00:05:32.000Z` to return a report of checkouts during that period.

dates should be of `iso 8601` format

Returns a checkout report

NB: On top of startDate and endDate, you could add other queries e.g. `artNumber=s001&store=ntinda&color=black` to return only black items of artNumber s001 in the ntinda store.

-----

## How To Contribute

### Issues

Issues are always very welcome. Please be sure to follow the [issue template](https://github.com/andela/engineering-playbook/issues/new).

### Pull requests

I am glad to get pull request if anything is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainer:

- Explain the issue that your PR is solving - or link to an existing issue
