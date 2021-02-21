# TAFD Application

## Launch

In the main directory, you can run:

### `docker-compose up`

It will start container with Mongo DB

### `yarn`

For installing node_modules

### `yarn start`

Your server will start on the http://localhost:4000/ 

After that, application will open on http://localhost:3000/


## Available routes

### `GET: /flights`

Returns array of IFlights (objects with all details about flight)

### `POST: /flights`

Creates new flight. Body: all valid flight details required

### `PATCH: /flights/:id`

Makes change in existing planned flight. 
Body with details required. If new status is "DELAYED", 
it's adds 15 minutes to planned departure time. Returns
new flight object

Note: after creating you can change the status of flight only

### `DELETE: /flights/:id`

Removes planned flight with such an id. Returns void