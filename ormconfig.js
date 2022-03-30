module.exports = {
    "name": "seed",
    "type": "mysql",
    "host": "rlab-mysql",
    "port": 3306,
    "username": "rlab-user",
    "password": "rlab-password",
    "database": "remotelabdb",
    "migrationsTableName": "migrations",
    "migrations": ["migrations/*.ts"], 
    "entities": ["src/**/*.entity.ts"],
    "cli": { 
        "migrationsDir": "migrations" 
    }
 }