## Commands
* npm run start:dev

## Setup Docker
* docker build -t rlab-api .
* docker-compose up
* docker run rlab-api

## Seed
* sequelize-cli seed:generate --name labs
* sequelize-cli db:seed:all
* sequelize-cli db:seed:undo:all

## Tutorials
### SSL for NestJS
* https://docs.nestjs.com/faq/multiple-servers

### API Authentication and Authorization
* https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-role-based-access-control/

### Docker
https://blog.logrocket.com/containerized-development-nestjs-docker/

### NgRx CRUD app
https://medium.com/better-programming/angular-building-a-crud-application-with-ngrx-40e5f1c0b50c

