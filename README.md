# Clone repository

Clone code for API
```
git clone git@github.com:PhysicsRemotelab/rlab-api.git
```

# Setup using Docker
```
docker compose up
```

Login into rlab-api container and seed database
```
npm run seed
```

# Setup without Docker

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
npm run typeorm:run-migrations
```

If API is running correctly, then it is possible to see Swagger documentation of all available API endpoints on following route
```
http://localhost:4000/api/
```

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

Use Docker
```
docker-compose up -d
```

Create database user and grant permissions
```
CREATE USER 'remotelabuser' IDENTIFIED WITH mysql_native_password BY 'strongpassword';
GRANT ALL PRIVILEGES ON *.* TO 'remotelabuser'@'%';
````