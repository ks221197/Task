## Description

This project contains login related APIs, in which two module included which are <a href="https://github.com/ks221197/Task/tree/071122-unitask/src/auth" target="_blank">User</a> and <a href="https://github.com/ks221197/Task/tree/071122-unitask/src/user" target="_blank">Auth</a> modules.

### Database
Used: <a href="https://www.sqlite.org/inmemorydb.html" target="_blank">SQLite in-memory database</a>, 
As mentioned project runs on in-memory database you don't need to create any tables, when you run this project table will automatically creates by using <a href="https://github.com/ks221197/Task/tree/071122-unitask/src/migrations" target="_blank">migration file</a> which created with  <a href="https://typeorm.io/" target="_blank">typeorm</a>.

### File details
<a href="https://github.com/ks221197/Task/blob/071122-unitask/src/filters/httpException.filter.ts" target="">httpException.filter.ts</a>

- For custom exception handler in-order to changes error response format

<a href="https://github.com/ks221197/Task/blob/071122-unitask/src/exceptions/httpException.ts" target="">httpException.ts</a>

- Work as more like interface by extending javascript error constructor

<a href="https://github.com/ks221197/Task/blob/071122-unitask/src/pipes/validation/validation.pipe.ts" target="_blank">validation.pipe.ts</a>

- Validation pipe for request data validation and will return single error message with bad request http status

<a href="https://github.com/ks221197/Task/blob/071122-unitask/src/config/config.service.ts" target="_blank">config.service.ts</a>

- Contains database connection configuration

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

### Swagger 
<a href="http://[::1]:3000/api#/" target="_blank">http://[::1]:3000/api#/</a>

### Postman collection
<a href="https://github.com/ks221197/Task/blob/071122-unitask/task071122.postman_collection.json" target="_blank">https://github.com/ks221197/Task/blob/071122-unitask/task071122.postman_collection.json</a>
