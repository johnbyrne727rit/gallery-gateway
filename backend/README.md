# Gallery Gateway Backend

## Getting Started

### Prerequisites

You'll need [Node](https://nodejs.org/en/download/) >= 8.x and [npm](https://docs.npmjs.com/cli/npm) to be installed. 

*Note: The build does not currently work with Node >= 12.x due to an issue with the sequelize package.
the most recent iteration was developed using Node version 10*

You'll need to be running [MySQL](https://www.mysql.com/downloads/) and [SimpleSAMLphp](https://simplesamlphp.org/). In development, our preferred method is to run them using [Docker](https://docs.docker.com/install/).

*Note: Docker desktop is only available on Unix systems, as a result, the project may need to be run on a virtual machine. For this iteration of the project, we used a Linux VM running on [Virtual Box](https://www.virtualbox.org/), however, most of these steps can also be completed on MacOs. An Ubuntu VM image of with the basic dev environment set up has been provided with the handoff documentation.*

### Installation

1. Install dependencies: `npm install`
2. Copy the default environment variables: `cp .env-sample .env`
3. Generate keys for JWT authentication: `npm run keygen`
4. Build & start the MySQL and SimpleSAMLphp Docker containers: `cd docker && docker-compose up -d && cd ..`
5. Copy the test SAML IDP's Cert into `keys/idp_cert.pem`. You can find it here: https://github.com/kristophjunge/docker-test-saml-idp/blob/master/config/simplesamlphp/server.crt
6. Migrate the database: `npm run migrate`
7. [Optional] Seed the database with users & demo data: `npm run seed`
8. Start the server: `npm run start`
9. The API will now be running on `http://localhost:3000`
10. You can visit `http://localhost:3000/graphiql` to use our interactive GraphQL playground or send requests to `http://localhost:3000/graphql` using your favorite HTTP client

## Development

- `server.js` - Sets up Express server
- `schema.js` - GraphQL Schema
- `bin/` - Entrypoint for Backpack
- `config/` - Configuration (eg. env variables, paths, SAML)
- `db/` - Database migrations & seeds
- `docker/` - Development Docker containers
- `helpers/` - Utility functions
- `middleware/` - Express request middleware
- `models/` - Sequelize models
- `resolvers/` - GraphQL query, mutation, and type resolvers
- `routes/` - Express REST endpoints (mainly for upload / download)
- `test/` - Tests
- `uploads/` - Where file uploads will be stored

To run the server and have it watch for changes, run `npm run watch`.

[ESLint](https://eslint.org/) is setup to warn you about style violations. You can run `npm run lint` to check for style violations.

## Testing

To run tests, run `npm run test`. To run an individual test, run `npm run test-file` with the path of the individual test file.

We use [Mocha](https://mochajs.org/) to run tests with the [Chai](http://www.chaijs.com/) assertion library. We use [faker.js](https://github.com/marak/Faker.js/) to generate fake test data and [supertest](https://github.com/visionmedia/supertest) to test endpoints. We use [Istanbul](https://istanbul.js.org/) to track code coverage.

## Troubleshooting Common Errors
### npm install fails
This will usually occur if you are using node version 12 or above, as some of the packages have not yet been updated to run on node 12. We have found that the easiest way to install and switch to different node verions is by using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md)

### npm run migrate fails with a timeout error
This will occur from time to time, especially on a slower virtual machine. This problem will likely be resolved by simply re-running the command a few times. If this continues to happen, you can try restarting docker, or restarting your VM.

### npm run migrate or npm run start fails with another error
npm migrate often fails when the wrong versions of certain packages are being used. Make sure you are running a node version >=8 and < 12. Once you are sure you are on the right version, try deleting your `/gallery-gateway/backend/node_modules` directory (yes this is okay to do, it will be regenerated), then run npm install again.

### npm run seed fails
This may occur if you are not connected to the internet, or, on occasion, if one of the sample image urls is taken down. In the case of the latter, you must update the failing URL in `/gallery-gateway/backend/db/seeds/20180415220000-seed-demo.js`.

In either case, unfortunately, the seed operations cannot be rolled back if they fail half way through, which will cause future seed operations to continue to fail. If an `npm run seed` fails, it is likely that the database is already populated with users. If you would like to complete the seed in order to prepopulate images and shows onto the database, you will likely need to take down the database with 
`cd docker && docker-compose down && cd ..`, then repeat steps 4 and 6 of the deployment process.

## Deployment

We use [Backpack](https://github.com/jaredpalmer/backpack) to compile our application into a single file. To build the API for production, run `npm run build`. This will create a `build/` folder with a compiled `main.js` output file.

You can then run this file with Node: `node main.js`

The frontend expects the API to be deployed to `https://gallerygateway.rit.edu/backend`. We use [nginx](https://nginx.org/en/) to proxy requests (and strip `/backend` from incoming requests). You can find our nginx config in our `deploy/` folder.

You'll need to have `keys/` and `uploads/` folders created relative to where you deploy the `main.js` file. You'll have to create RSA keys for JWT authentication and provide the production SAML IDP Cert and put these in the `keys/` folder. Any file uploads (and thumbnails) will be stored in the `uploads/` folder.

The production MySQL database should be >= v5.7 and should be configured to use the `utf8mb4` character-set. You can see an example configuration in our `docker/` folder.

You can use `npm run migrate` to migrate the MySQL database. If you need more sophisticated database management scripts (eg. rollback), run `npm run sequelize` to access the Sequelize command-line tools.
