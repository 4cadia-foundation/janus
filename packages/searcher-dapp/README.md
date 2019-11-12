# Vue.js Dapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# run lint code highlight
npm run lint

# run lint fix code
npm run fix

# run build production and send the dist folder to another branch
npm run deploy
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Git Flow

 - Create a feature from master named: "feature/[ JIRA TAG ]"

 - Commit and push alterations from feature

 - Checkout to the Develop branch and then Merge/Pull Request your feature 

 - Push the alterations on Develop branch

 - Checkout to the Master branch and then Merge/Pull Request your feature 

 - Push the alterations on Master branch

 - Run `npm run build` to generate Dist folder

 - Run `npm run deploy` to send Dist folder to 'dist' named branch