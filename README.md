## Commands
* npm install
* npm run start
* http://localhost:4000/api/

## Database tables and seed data
* Run program to automatically create tables
* sequelize-cli db:seed:all

# Migrations
* npx sequelize-cli migration:generate --name migration-skeleton
* npx sequelize-cli db:migrate

## Setup Docker (optional)
* docker build -t rlab-api .
* docker-compose up
* docker run rlab-api

## Tutorials
### SSL for NestJS
* https://docs.nestjs.com/faq/multiple-servers

### API Authentication and Authorization
* https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-role-based-access-control/

### Docker
https://blog.logrocket.com/containerized-development-nestjs-docker/

### NgRx CRUD app
https://medium.com/better-programming/angular-building-a-crud-application-with-ngrx-40e5f1c0b50c

