# Questions Answers Code Challenge

In early 2024 I unfortunately found myself made redundant and unexpectedly looking for a new role and completed several tech tests during this process. I decided to use a particularly interesting one to showcase my skills as an experienced Software Engineer, this is the repo you are now looking at.

This repo showcases:
- TypeScript
- React (incl. use of ContextAPI for state management and error handling)
- Docker (incl. multi-stage builds)
- GraphQL (incl. type generation for queries, migrations and resolvers)
- Testing (using React testing library, Apollo MockedProvider and mocked DB operations)
- Data operations using Postgres (incl. DB migrations and seeds)
- A good developer experience (incl. use of EsLint, Prettier and Docker compose)
- Use of Chakra for UI components

What would I add if there was more time or it was a production app? Load of things! But in particular,
- Styling :-(  There is a distinct lack of styling, I will attempt to get around to remedying this
- Better handling of loading and error states
- A really nice UI and UX
- The "right" level of testing for a production-grade app, more unit tests; some integration testing; visual regression testing
- A CI/CD pipeline

A modified version of the brief I received is at the bottom of this readme.

## Setup

To start the client:
- Install the dependencies using `npm install` from within the `frontend` director
- Followed by `npm start` to start the CRA dev server
- The app will be accessible via http://localhost:3000/

To start the server:
- Install the dependencies using `npm install` from within the `backend` director
- Followed by `npm start` to start the server
- The GraphQL client and server will be accessible via http://localhost:4000/graphql

To start the stack dependencies (Postgres);
- Run `docker compose up` from the root directory
- After the DB has started, the migrations can be run using `npm run knex migrate:latest` from within the `backend` directory
- After the DB has started and the migrations have been run, the seeds can be run using `npm run knex seed:run` from within the `backend` directory

Other dev commands:
- Client and server tests can be run using `npm run test` from within `frontend` or `backend` directories respectively (they will default to 'watch' mode)
- Client and server linting can be run using `npm run lint` from within `frontend` or `backend` directories respectively.
- The generated type files are checked in and generated automatically when the server processes are running. But can be manually generated for both client and server by using `npm run typegen` from within `frontend` or `backend` directories respectively.

To build and run the containers in a (basic) prod-like setup:
- Run `docker compose -f docker-compose-prod.yml build` from the root directory
- Run `docker compose -f docker-compose-prod.yml up` from the root directory
- The app will be accessible via http://localhost:3000/
- The migrations and seed commands from above can be used to add data to the DB


---


## Brief

Jane is a clinical therapist and wants her clients to answer simple questionnaires in order to better understand them. She needs a way to add/delete/edit questions and also see the answers of each client.

### Backend

You are tasked with writing an API to create/edit/delete Users, Questions, and Answers. It should be a NodeJS/ExpressJS server with the following endpoints:

- Return all the users. (No need for other user endpoints, just create a sample set of users locally or in the db if you choose one)
- Create a new Question
- Edit a Question
- Delete a Question
- Create a user Answer
- Edit a user Answer
- Delete a user Answer
- Return all the answers of a user

🔎 **Things we're looking for:**

It should be production quality as you understand it, i.e. tests, Docker, README, documentation, etc.

- TypeScript
- Project Structure
- Unit Tests
- API Design
- Error Handling

🏆 **BIG PLUS:**

We don't care for data persistence at this point so you could just save everything in variables locally, but it's a big plus if you can also **save and read the data from a MongoDB or PostgreSQL database.**

### Frontend

You are tasked with writing a React/React Native app to consume the backend API. Your app should be able to complete the following tasks:

- See a list of users
- See a list of questions
- add a new question
- edit a question
- delete a question
- see all the answers of a user
- add a new answer
- delete an answer

🔎 **Things we're looking for:**

- TypeScript
- Project Structure
- Components Structure
- State Management
- Separation of concerns
- Data Handling

🏆 **BIG PLUS:**

You can use anything you want for state management. We use MobX and the Context API a lot so it's a big plus if you can also **implement some/all of the state handling with MobX and Context API**.
