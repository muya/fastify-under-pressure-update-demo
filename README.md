# Demo Project for Suggested Fastify Under Pressure Documentation Update

Demos the updated schema to Fastify's Under Pressure Plugin for 500 & 503 responses.

PR: https://github.com/fastify/under-pressure/pull/198

## Running the Project

- Clone the project and `cd` into it
- Run `npm install`
- Run the project using: `node server`

The project will start up on http://localhost:3000

Check the Swagger documentation at: http://localhost:3000/documentation/

It should show the documentation for the custom health check endpoint, with documentation for 500 & 503 responses.
