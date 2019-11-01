# uber-giphy

## Introduction

#### React-scripts

I decided to use react-scripts, which is good enough for training purpose (not for production!)

React-scripts include Webpack, Babel, ESlint, CSS modules and other cool tools under the hood.

#### Typescript

I really wanted to add Typescript here, it's good because of API requests, unit tests and other reasons,
but I haven't had enough time to add all what I wanted.

#### Redux && Redux-thunk

In addition to React I decided to use Redux with middleware redux-thunk to work with async actions.

#### InfiniteScroll plugin

I did use InfiniteScroll plugin to trigger Update action when we reach bottom of the screen because:

1. in real life best practice is use ready-to-use plugins, especially in case they are lightweight and are good match

2. I checked code of this plugin, it's pretty easy, so I can reproduce this code here in  the project, but I think it wasn't required

#### Testing

For testing purpose I used Jest && Enzyme with following libraries, like jest-enzyme etc

In every connected components I exported component itself (for testing purpose) and connected one

I could use redux-mock-store, but I decided to follow a approach from [Redux tutorial](https://redux.js.org/recipes/writing-tests)

Coverage is not good enough for all components and containers, but I had a limit of time

## How to run project

Use `npm install` to install dependencies

Use `npm start` to start the project

Use `npm test` to test the project 

Use `npm test -- --coverage` to see coverage
