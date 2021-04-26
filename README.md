# ![LogoMakr-04nw3H](https://user-images.githubusercontent.com/3071208/116048358-61f89e80-a675-11eb-91cd-2af6a84a107c.png)

## How to

## Dependencies

Requires `Node` and run `npm install`. 

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
| 2021-04-25 | Design   | multiple token per user    | for MVP purposes a user will have a multiple reference to token based on calls to auth endpoint. A post MVP process should clean this        |
| 2021-04-25 | Design   | Unauthorization precedence | authorization will take precedence over other possible errors to remove attack vectors of unauthorized entities to explore existing endpoints |
| 2021-04-25 | Design   | Local Stores accessibility | currently only using dictionary as store for MVP without DB. Also gives accessibility for testing purpose that will be removed when DB is in place and tools like test container can be used for this boundary test |

## Current Architecture
![Blank diagram - Current Architecture](https://user-images.githubusercontent.com/3071208/116071555-55cd0b00-a68e-11eb-8241-240bfdd8ec80.jpeg)
![Blank diagram - pipeline](https://user-images.githubusercontent.com/3071208/116080690-ae55d580-a699-11eb-812f-699769c8cbf7.jpeg)
## Future Architecture
![Blank diagram - Future Architecture (1)](https://user-images.githubusercontent.com/3071208/116080687-ad24a880-a699-11eb-806e-526477ff7853.jpeg)
![Blank diagram - pipeline future](https://user-images.githubusercontent.com/3071208/116080692-af870280-a699-11eb-9c68-8accc0475180.jpeg)