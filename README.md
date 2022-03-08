## Automated Test

### Prerequisite

* [NodeJS](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [NPM](https://www.npmjs.com/) - Node Package Manager

### Folder Structure

- data
    - [api-group]
        - [json]
            - [static-data.json]
        - [seed]
            - [seed-func]
    - Fake.js
    - Seeder.js
- models
    - [api-group]
        - request
            - [request-func]
        - response
            - [response-func]
- service
    - [api-group]
        - [service-func]
- test
    - [api-group]
        - [module]
            - [test-func]

### Copy and adjust .env if needed

Run `cp .env.example .env` then adjust value in .env to meet your requirement.

### Install Dependency

Run `npm install` 

### Run Test

Run `npm test`

### Run Single Test

Run `npm test -- --testPathPattern={path-to-file or file-pattern}`

### Report

You can see test result report in:

* /report/index.html for html view or
* /report/jest-results.json for json
* /report/junit.xml for xml