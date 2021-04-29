# ![LogoMakr-04nw3H](https://user-images.githubusercontent.com/3071208/116048358-61f89e80-a675-11eb-91cd-2af6a84a107c.png)

## Motivation
Simple server side exercise, it will be evaluated using a test suite that checks the constraints to assert the business logic is correct and by Onna engineers on a less objective approach to check overall architecture.
## Live version
please use the provided postman collections to interact with the love version in heroku hosted under `https://twains31.herokuapp.com`
## How to Run

### Dependencies

Requires `Node` and run `npm install` or have `docker`. 

### Run Locally
* `npm run start:local`: start local environment
* `npm run start:dev`: start local environment with hot reload on changes
* `npm run start`: start production code
* `docker build -t "31twains-local" . && docker run -it -e NODE_ENV=development -e USERNAME=test -e PASSWORD=test 31twains-local:latest` : Run using docker container

### Run Test
* `npm run test`: runs test
* `npm run test:dev`: runs test with hot reload on changes
* `npm run test:cov`: runs tests with coverage

## Project Structure

 ```
.
├── src                                                     
│   ├── server.ts                                           // Entrypoint
│   ├── app.ts                                              // Express server
│   ├── binders                                             // Bindings
│   ├── middleware                                          // middleware
│   ├── controllers                                         // api routes
│   ├── repository                                          // data access layer
│   ├── types                                               // type definitions
│   └── utils                                               // crosscutting concerns
│
├── test                                                    // Tests
│
├── postman                                                 //postman collection for E2E
│
├── .github                                               
│   └── workflows    
│       └── main.yml                                        //CI/CD definition 
│
├── Dockerfile                                              // Docker file for app release    
├── README.md                                               // This documentation file
├── package.json                                            // Project file
├── package-lock.json                                       // Dependencies reference
├── quotes.json                                             // initial data
└── tsconfig.json                                           // typescript configuration
 ```
 ## Decision Record

| Date       | Type     | Header                     | Definition                                                                                                                                   |
|------------|----------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| 2021-04-23 | Practice | Trunk Based Development    | Only one branch and control deployments by feature toggles or abstractions                                                                   |
| 2021-04-23 | Practice | TDD                        | Write test first to generate minimal code that works                                                                                         |
| 2021-04-23 | Practice | Deploy directly to prod    | Only one environment to reduce costs and understand real performance and behavior                                                           |
| 2021-04-23 | Practice | Observability              | Have logs and metrics for prod deployments                                                                                                   |
| 2021-04-23 | Practice | Tag commits with issue number    |  set the issue number in the commit so it can be retrieved from the issue history|
| 2021-04-25 | Design   | multiple token per user    | for MVP purposes a user will have a multiple reference to token based on calls to auth endpoint. A post MVP process should clean this        |
| 2021-04-25 | Design   | Unauthorization precedence | authorization will take precedence over other possible errors to remove attack vectors of unauthorized entities to explore existing endpoints |
| 2021-04-25 | Design   | Local Stores accessibility | currently only using dictionary as store for MVP without DB. Also gives accessibility for testing purpose that will be removed when DB is in place and tools like test container can be used for this boundary test |
| 2021-04-26 | Recommendation   | Not use 405 | 405 wont help machines to fix the issue it only helps attackers to recognize the endpoint exist with a different method |
| 2021-04-26 | Recommendation   | No GET method with side effects | the get endpoint that generates a link is semantically incorrect for a REST API as it generates a record. It should be a Post in share with the shareId |

## Next Steps
* Use database and not in memory storage.
* Use less basic types to be pass around and use more extensible domain objects

## Current Architecture

### App
![Blank diagram - Current Architecture](https://user-images.githubusercontent.com/3071208/116071555-55cd0b00-a68e-11eb-8241-240bfdd8ec80.jpeg)
### Pipeline
![Blank diagram - pipeline](https://user-images.githubusercontent.com/3071208/116080690-ae55d580-a699-11eb-812f-699769c8cbf7.jpeg)
## Future Architecture
### App
![Blank diagram - Future Architecture (1)](https://user-images.githubusercontent.com/3071208/116080687-ad24a880-a699-11eb-806e-526477ff7853.jpeg)
### Pipeline
![Blank diagram - pipeline future](https://user-images.githubusercontent.com/3071208/116080692-af870280-a699-11eb-9c68-8accc0475180.jpeg)

## Metrics

### Code Coverage
```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   97.56 |    86.84 |   97.14 |   97.22 |                   
 src                   |      75 |        0 |       0 |      75 |                   
  app.ts               |     100 |      100 |     100 |     100 |                   
  server.ts            |       0 |        0 |       0 |       0 | 1-4               
 src/binders           |     100 |      100 |     100 |     100 |                   
  middleware-binder.ts |     100 |      100 |     100 |     100 |                   
  routes-binder.ts     |     100 |      100 |     100 |     100 |                   
 src/controllers       |     100 |      100 |     100 |     100 |                   
  authorization.ts     |     100 |      100 |     100 |     100 |                   
  quotes.ts            |     100 |      100 |     100 |     100 |                   
  share.ts             |     100 |      100 |     100 |     100 |                   
 src/middleware        |     100 |      100 |     100 |     100 |                   
  authorization.ts     |     100 |      100 |     100 |     100 |                   
  error-handler.ts     |     100 |      100 |     100 |     100 |                   
 src/repository        |     100 |      100 |     100 |     100 |                   
  quotes.ts            |     100 |      100 |     100 |     100 |                   
  share.ts             |     100 |      100 |     100 |     100 |                   
  token.ts             |     100 |      100 |     100 |     100 |                   
 src/types             |     100 |      100 |     100 |     100 |                   
  errors.ts            |     100 |      100 |     100 |     100 |                   
 src/utils             |   90.91 |       50 |     100 |      90 |                   
  logger.ts            |   85.71 |       50 |     100 |   85.71 | 16                
  not-allowed.ts       |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------
```