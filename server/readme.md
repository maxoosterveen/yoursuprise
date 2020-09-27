# Available Scripts

In the project directory, you can run:

## `npm run dev`

Starts the server in development mode. The server will restart if you make edits. <br>

## `npm run start`

Starts the server.


# .env

## NODE_ENV
### `NODE_ENV=development`
Having the server in development mode will <b>not</b> load the static build files from React. <br>
This means you have to start the React app seperate. <br>
See the [client](./client) folder for more info about the front-end.

### `NODE_ENV=production`
Having the server in development will load static build files from React. <br>
This means you do not have to start the react app seperate, but it is possible.

## API CALLS

```http
GET /api/v1/incidents
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `date` | `string` | **Optional**. date (ex. 2020-09-25T17:50:10) |
| `category` | `string` | **Optional**. jams or roadworks |


