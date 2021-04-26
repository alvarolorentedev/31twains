# ![LogoMakr-04nw3H](https://user-images.githubusercontent.com/3071208/116048358-61f89e80-a675-11eb-91cd-2af6a84a107c.png)

## Project Structure

 ```
.
├── src                                                     // Source Code
│   ├── server.ts                                           // Entrypoint
│   ├── app.ts                                              // Express server
│   ├── binders                                             // Bindings
│   ├── middleware                                          // middlewares
│   ├── controllers                                         // api routes
│   ├── repository                                          // data access layer
│   ├── types                                               // type definitions
│   └── utils                                               // crosscutting concerns
│
├── test                                                    // Tests
│
├── postman                                                 //postman collection for E2E
│   ├── 31twains\ -\ local.postman_environment.json         // postman local variables
│   ├── 31twains\ -\ remote.postman_environment.json        // postman remote variables
│   ├── 31twains.postman_collection.json                    // collection endpoints
│   └── replaceFileFromEnvironment.js                       // script to setup e2e test
│
├── Dockerfile                                              // Docker file for app release    
├── README.md                                               // This documentation file
├── package.json                                            // Project definition and configuration
├── package-lock.json                                       // Dependencies reference
├── quotes.json                                             // initial data
└── tsconfig.json                                           // typescript configuration
 ```
 ## Decision Record

| Date       | Type     | Header                     | Definition                                                                                                                                   |
|------------|----------|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| 2021-04-23 | Practice | Trunk Based Development    | Only one branch and control deployments by feature toggles or abstractions                                                                   |
| 2021-04-23 | Practice | TDD                        | Write test first to generate minimal code that works                                                                                         |
| 2021-04-23 | Practice | Deploy directly to prod    | Only one environment to reduce costs and understand real performance and behaviour                                                           |
| 2021-04-23 | Practice | Observability              | Have logs and metrics for prod deployments                                                                                                   |
| 2021-04-25 | Desing   | multiple token per user    | for MVP purposes a user will have a multiple reference to token based on calls to auth endpoint. A post MVP process should clean this        |
| 2021-04-25 | Desing   | Unauthorization presedence | authorization will take precedence over other possible errors to remove atack vectors of unauthorized entities to explore exisitng endpoints |