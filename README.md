# Gallery Gateway

![Gallery Gateway Logo](https://user-images.githubusercontent.com/13719429/36440348-8d156e20-163d-11e8-8462-dfe4ba840a41.png)

## About

### Motivation

The [RIT](https://www.rit.edu/) [School of Photographic Arts and Sciences (SPAS)](http://cias.rit.edu/schools/photographic-arts-sciences) holds an annual art exhibition highlighting the top works of RIT student artists. Students can submit works for consideration during an open call, and a panel of RIT faculty jurors vote on which art will be displayed in the gallery at this show. Currently, SPAS has been paying for and using a software as a service product, [CaFÉ](https://www.callforentry.org/), to facilitate this process; however, frustrations with CaFÉ’s difficult-to-use interface and poor user-experience for both administrative and student workflows has led them to seek custom replacement software which better fits their use case and work process.

Gallery Gateway is this custom replacement software.

In addition to it's use for art showcases, Gallery Gateway has also been employed to facilitate in the scholarship selection process. In the current process, scholarship applications are reviewed by judges manually inspecting art pieces, which must be printed out by the students themselves. Gallery Gateway will facilitate this process by condensing all of the scholarship pieces into a single place, allowing for easier judging while also saving students the cost of printing.

### Team

Gallery Gateway was built as a Senior Project for RIT's [Software Engineering Undergraduate Program](http://www.se.rit.edu/).

This iteration of the project was forked from the [original Gallery Gateway Repository](https://github.com/abstractionhq/gallery-gateway/), built by [Team A B S T R A C T I O N](http://www.se.rit.edu/~abstraction/) during the Fall 2017 and Spring 2018 semesters.

The second iteration of the project was built during the Fall 2019 and Spring 2020 semesters by [The Curators](http://www.se.rit.edu/~thecurators/) under supervision of sponsor Nanette Salvaggio and faculty coach Mohamed Wiem Mkaouer

## Architecture

Both the frontend and backend are written in JavaScript.

Frontend:

- [React](https://reactjs.org/) for view rendering
- [Redux](https://redux.js.org/) for state management
- [React Router](https://reacttraining.com/react-router/) v4 for page routing
- [Apollo Client](https://github.com/apollographql/apollo-client) for GraphQL querying and data caching
- [Boostrap](http://getbootstrap.com/) v4 (via [reactstrap](https://reactstrap.github.io/)) & [styled-components](https://www.styled-components.com/) for styling
- [Formik](https://github.com/jaredpalmer/formik) w/ [yup](https://github.com/jquense/yup) for forms
- [Webpack](https://webpack.js.org/) for compiling our app and bundling assets together

Backend:

- [Express](https://expressjs.com/) as our web framework w/ [Apollo Server](https://github.com/apollographql/apollo-server) as our GraphQL server
- [Sequelize](http://docs.sequelizejs.com/) as our ORM w/ [MySQL](https://www.mysql.com/) (>= 5.7) as our database
- [Passport](http://www.passportjs.org/) w/ [Passport SAML](https://github.com/bergie/passport-saml) for external user authentication
- [JWT](https://jwt.io/) for API authentication & short lived tokens
- [Multer](https://github.com/expressjs/multer) for file uploads

See each of their `package.json` files for the other tools we used (eg. transpiling, linting, testing).

### New to React, Redux, & GraphQL?

Here are some useful resources on these tools and our architecture:

#### React

- [The Beginner's Guide to ReactJS](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) by Kent C. Dodds
- [the Road to learn React](https://roadtoreact.com/)
- [React Express](http://www.react.express/)
- [awesome-react](https://github.com/enaqx/awesome-react)
- [react-redux-links](https://github.com/markerikson/react-redux-links) by Mark Erikson
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov
- [Simple React Patterns](http://lucasmreis.github.io/blog/simple-react-patterns/) by Lucas Reis
- [Fullstack React](https://www.fullstackreact.com/)
- [React for Beginners](https://reactforbeginners.com/) by Wes Bos
- [Advanced React](https://courses.totalreact.com/p/advanced-react-free) by Ryan Florence

#### Redux

- [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) by Dan Abramov
- [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux) by Dan Abramov
- [A cartoon intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) by Lin Clark
- [Live React: Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs) by Dan Abramov
- [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44) by Eric Elliott
- [Learn Redux](https://learnredux.com/) by Wes Bos
- [Redux Developer Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

#### GraphQL

- [GraphQL](http://graphql.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Apollo Developers Blog](https://dev-blog.apollodata.com/)
- [How to GraphQL](https://www.howtographql.com/)
- [The GitHub GraphQL API](https://githubengineering.com/the-github-graphql-api/)
- [From REST to GraphQL](https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b) by Jacob Gillespie
- [awesome-graphql](https://github.com/chentsulin/awesome-graphql)
- [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)

## Development

You'll need to be running both the frontend and backend for development. Check out each of their README's for further instructions.

Additional Documentation regarding this project can be found in our [documentation index](https://drive.google.com/open?id=1nrIw5kysk8iKvdw8QSMqzTuxrqZcepXX3M-DJGtvSZM).

## Deployment

These are instructions for deployment to a production environment, which is assumed to be hosted at [http://gallerygateway.rit.edu/](http://gallerygateway.rit.edu/). For more information on deploying
for testing and development, see the README files found in `gallerygateway/backend` and `gallerygateway/frontend`

We deploy our application on Ubuntu 16.04.

### Prequisites

#### Install Node (10.x LTS) & NPM (>= 5.6)

```sh
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Install Yarn (>= 1.6)

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn
```
#### Install MySQL
```sh
sudo apt-get install mysql-server
```

To configure password and other settings run
```sh
sudo mysql_secure_installation utility
```

To start MySQL run
```sh
sudo systemctl start mysql
```

#### Install [Nginx](https://nginx.org/en/)
```sh
sudo apt install nginx
```

Then start Nginx with
```sh
sudo systemctl start nginx
```

#### Install [Supervisor](http://supervisord.org/)
```sh
sudo apt-get install supervisor
```

Supervisor should automatically be running after installation, but you can double check by running
 ```sh
 service supervisor restart
 ```

#### Additionally, setup HTTPS 
  This can be done using [Let's Encrypt](https://letsencrypt.org/).


### Deployment Setup

1. There must be a user in the sql database named 'gallerygateway'
    1. To create a new user, start a mysql session with
        ```sh
        sudo /usr/bin/mysql -u root -p
        ```

    2. You can then check if the user already exists with
        ```sh
        SELECT User, Host FROM mysql.user;
        ```

    3. Create a new user in the database named gallerygateway (if one does not already exist)
        ```sh
        CREATE USER 'gallerygateway' IDENTIFIED BY '<password>';
        ```
        Replacing \<password\> with your user password

2. In the top level directory, you must add a file called `mysql_password.txt` 
   containing, on the first line, the password for the gallerygateway sql user
   that was just created

3. Provide the MySQL database password, RSA keys used for JWT authentication (see below)

    ```sh
    cd /opt/node/gallerygateway/keys
    sudo openssl genrsa -out private.key 4096
    sudo openssl rsa -in private.key -outform PEM -pubout -out public.key
    ```
    
4. Add the the Identity Provider Certificate (idp_cert.pem) to /opt/node/gallerygateway/keys.
   Instructions on creating a self signed certificate can be found [here](https://wiki.shibboleth.net/confluence/display/CONCEPT/SAMLKeysAndCertificates#SAMLKeysAndCertificates-SAMLKeysandCertificates)
    
### Deploy the App
Run the deploy script
```sh
deploy/deploy.sh <git url>
```
where \<git url\> is the url link to the zip download of the target git repository. If left blank, 
this will default to https://github.com/abstractionhq/gallery-gateway/archive/master.zip

```deploy.sh``` is the only file that is needed in the source location to deploy the project. The rest of the source is downloaded as a part of the script

The script will:
- Create a MySQL database if one does not exist (and set the character encoding to UTF-8)
- Download this project's source from GitHub
- Install and build the frontend
- Install and build the backend
- Migrate the database tables
- Start the backend using Supervisor

If the backend fails to start, the script will still complete, you can check if it is running by 
entering the command
```sh
sudo supervisorctl status all
```

### Troubleshooting Common Errors
#### /usr/bin/mysql -u root -p gives command not found error
This may mean that mysql has already been added to the path. In this case, try the command.
```sh
mysql -u root -p
```
The shell deploy script will still function properly in this case.

If this does not work, mysql may be installed somewhere else, or may not be installed at all.


#### The Supervisor backend is not running
You are likely missing one of the required keys. You can check the 
supervisor logs found in `/opt/node/gallerygateway/log.txt` for more information


 

## Maintenance

Because the JavaScript community tends to move faster than other language communities, this app will require regular maintenance to make sure it can run on the current LTS [Node.js](https://nodejs.org/en/) runtime. Additionally, [npm](http://npmjs.com/) packages this app depends on should be periodically monitored, including updating to their latest stable versions (possibly even switching packages if the current maintainer abandons support).

Package dependencies will generally only need to be updated if packages contain security vulnerabilities or you will be developing additional features or upgrading Node versions. When running `npm install` or `yarn install`, you generally will be warned of deprecated package versions. It is recommended to also install [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) and run `ncu` to check which packages are out-of-date. Then, read through the `CHANGELOG`s of each out-dated package (they're usually found on the package's npm page or GitHub repo) to see if there are any breaking changes. If there are, update any of this project's code impacted by the breaking changes and update the version of the package in the corresponding `package.json` file. Double check that the upgrade is compatible by making sure that all existing tests pass (Note: frontend updates that impact styling will likely need to be manually tested).

Determining the health of a package is subjective but usually involves identifying when its most recent commits were, how active the maintainers are in responding to Issues and Pull Requests, and the number of Issues and Pull Requests the project has. Additionally, new packages may be developed which offer similar features to a package we use, but because of non-functional characteristics (e.g. performance, user experience), the JavaScript community may collectively favor this new package over the old and recommend switching. A word of caution; though, beware of hype-driven development – it plagues the JavaScript community.

[Node.js LTS releases](https://github.com/nodejs/Release#release-schedule) are cut every year in April. Upgrading Node versions involves updating any uses of deprecated [Node API](https://nodejs.org/dist/latest/docs/api/) calls and making sure that all npm dependencies are compatible with the new Node version.

Changes to ECMAScript are generally backwards compatible, so it is unlikely that the language syntax will need maintenance. However, since we currently rely on [Babel](https://babeljs.io/) to transpile down to what's supported in major browsers and Node, Babel may need to be periodically updated. Ideally, Babel could be removed when the language features we're using are [supported natively](http://kangax.github.io/compat-table/es2016plus/) in all major browsers and Node.
