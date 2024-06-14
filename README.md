# Frontend-Cypress
Frontend V2 E2E Cypress Test Cases

## Prerequisites
Install Node JS from https://nodejs.org/en

Set system variable NODE_HOME(C:\Program Files\nodejs) and set the same in the PATH variable

## Cloning Cypress Repo 
Clone the cypress repo to a folder using the below command
```
git clone git@github.com:socotra/frontend-cypress.git
```

User needs to set up ssh keys before pulling the code from the github repo.

Refer the document [here](https://socotra.atlassian.net/wiki/spaces/QUAL/pages/1266581654/Setting+up+SSH+Keys+to+clone+the+repo)

## Installation
For rest of the installations go to projects root folder in command prompt and type the commands

Below command installs Cypress and all the other dependencies from package.json

```
cd frontend-cypress
npm i
```

## Opening Cypress Test Runner
`npx cypress open`



## Running Cypress Tests via Test Runner
Click on the test case spec file to run the test cases from Cypress Test Runner

### Tests Locations

| Type | Location                                   |
| ---- | ------------------------------------------ |
| tests | [cypress/integration/tests](./cypress/tests) |



### Running all tests via terminal in headless mode
```
npx cypress run
```

### Additional NPM Scripts

| Script                  | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| cy:open                 | Open interactive cypress run your tests                             |
| cy:run:headless         | Run headless mode with default electron browser                     |
| cy:chrome:headless      | Run headless with with chrome browser                               |

### Running tests on BrowserStack
First, install the BrowserStack - Cypress CLI via npm:

```
npm install -g browserstack-cypress-cli
```

Create browserstack json file
```
browserstack-cypress init
```

Run your tests

```
browserstack-cypress run --sync
```