# Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the server in development mode. The server will restart if you make edits. <br>

### `npm run start`

Runs the server in production mode. <br>


# .env

## NODE_ENV
### Development
Having the server in development mode will not the static build files from React. <br>
This means you have to start the React app seperate. <br>
See the [client](./client) folder for more info about the front-end.

### Production
Having the server in development will load static build files from React. <br>
This means you do not have to start the react app seperate, but it is possible.