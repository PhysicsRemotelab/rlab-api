module.exports = {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "strongpassword",
    "database": "remotelabdb",
    "migrationsTableName": "migrations",
    "migrations": ["migrations/*.ts"], 
    "entities": ["src/**/*.entity.ts"],
    "cli": { 
        "migrationsDir": "migrations" 
    }
 }
