# Setup

Clone code for API
```
git clone git@github.com:PhysicsRemotelab/rlab-api.git
```

After cloning, go to directory and install Node dependencies. Dependencies to be installed are defined in package.json file.
```
npm install
```

After dependencies are installed, run application
```
npm start
```

When running application, database tables are created automatically.

By default, database will be empty. To seed database with default data run, following command
```
npm run seed
```

If API is running correctly, then it is possible to see Swagger documentation of all available API endpoints on following route
```
http://localhost:4000/api/
```

# Additional commands
* npx sequelize-cli migration:generate --name migration-skeleton
* npx sequelize-cli db:migrate

# Setting up inital database
Add root password in database
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'strongpassword';
```

# Upgrade all versions
Check outdated dependencies
```
npm outdated
```

Install tool for upgrading all dependencies
```
npm install -g npm-check-updates
```

Use command to upgrade all dependencies
```
ncu -u
```

## Additional reading
* https://docs.nestjs.com/faq/multiple-servers
* https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-role-based-access-control/
* https://blog.logrocket.com/containerized-development-nestjs-docker/
* https://medium.com/better-programming/angular-building-a-crud-application-with-ngrx-40e5f1c0b50c
