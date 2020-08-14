## Helpful Human Coding Assessment Color App

This application was built for a coding assessment. The stack used for the application is:
* SQLite3
* Node / Express
* GraphQL
* React / ApolloClient

The purpose of the app is to display simple color swatches, and demonstrate some basic navigation and filtering capabilities.

I chose to use this stack to challenge myself and increase my familiarity with a full JS stack. This is the first time I have created an application using graphql. Additionally, all the styling for the application is custom css. However, if I wear to do this again I would likely use a UI framework of components for consistency. However, I wanted to match the spec as closely as possible.

### Unit Testing

I ran out of time to add unit tests. But was planning on implementing some tests for the front end using jest. By adding unit tests you can make a process of continuous integration allowing you to confidently push application changes while having a testing suite back up that you didn't break anything. There is also a snapshot feature that can ensure that the UI hasn't changed if that is an important criteria.

### Running the application

#### Creating a data table

You can use the generateColors script in the model directory to create a .sql file that you can dump into a standard SQL database. For this application I chose SQLite for simplicity. In future iterations of the application I would likely use mySQL instead but again I felt it was important to get a working application before over optimizing. Plus, SQLite is an excellency option for dev environments as well.

#### GraphQL Server

The graphql server can be started by changing in the server directory and running `node server.js`. This will start the server on localhost port 4000.
```
yarn install # or npm install
cd ./server
node server.js # or use yarn start
```

#### Frontend / ReactApp

You can run the react app by changing into the frontend directory, installing the dependencies and running `yarn start`

```
cd ./frontend
yarn install
yarn start
```



