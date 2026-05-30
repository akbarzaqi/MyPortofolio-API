# Portofolio API

## Documentation for using the API

to build and run the project, you can use the following command:

    docker compose up -d --build

to stop the project, you can use the following command:

    docker compose down

to execute the migration, you can use the following command:
    
    docker compose exec app npm run migrate up

to make a new migration, you can use the following command:

    docker compose exec app npm run migrate create <migration_name>

to rollback the migration, you can use the following command:
    
    docker compose exec app npm run migrate down

to access postgres database, you can use the following command:
    
    docker compose exec db psql -U postgres -d portofolio_db 
    docker exec -it <container_id> psql -U postgres -d portofolio_db

