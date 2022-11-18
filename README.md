# Technical challenge for NG.CASH

## Description
Web aplication whose purpose is to enable NG users to be able to carry out internal transfers between themselves.

## Stacks and Technologies
- TypeScipt
- Node.js
- Express
- Docker
- Prisma
- Postgres

## How to Run
### Steps using localhost
- bash `npm i` in the terminal
- create a .env file
- write the following on it
    - `PORT=` port where the back-end will run on 
    - `POSTGRES_USERNAME=` username of your postgres (usually it's postgres)
    - `POSTGRES_PASSWORD` password of your postgres (if you don't know, it's probably postgres)
    - `POSTGRES_HOST=localhost`
    - `POSTGRES_PORT=5432` default port for postgres
    - `POSTGRES_DATABASE=` name you can choose for the database
    - `DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public`
    - `SPACENEWS_URL=https://api.spaceflightnewsapi.net/v3/articles`

- bash `npx prisma generate` in the terminal
- bash `npx prisma migrate dev` in the terminal
- if it did not ran the seed, bash `npx prisma db seed` in the terminal
- last, bash `npm run dev` in the terminal
- if types errors or imports from `@prisma/client` appear, open the command palette and run `Prisma: Restart Language Server` and/or `TypeScript: Restart TS server`. To run the latter you need to be editing a typescript file

### Steps using Docker
- create a .env.docker file
- write the following on it
    - `PORT=5000`, to change this, you also need to change the `EXPOSE` port in the Dockerfile
    - `POSTGRES_USERNAME=postgres`, you can change it
    - `POSTGRES_PASSWORD=postgres`, you can change it
    - `POSTGRES_HOST=database`, refers to the service in the docker-compose.yaml file
    - `POSTGRES_PORT=5432`, postgres container port
    - `POSTGRES_DATABASE=` name you can choose for the database
    - `DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public`
    
- bash `docker-compose build` in the terminal
- bash `docker-compose up` in the terminal
- now you can access the server using `localhost:`(the port you chose)
- bash `docker-compose down` to take it down

## Routes

### `POST /sign-up`
- creates a user and a account for him
- requires JSON body with `username` and `password`, former at least 3 characters and latter at least 8
- returns status 200 if everything is ok

### `POST /sign-in`
- returns a JSON with the jwt token generated for the user in the key "token". Token valid for 24 hours
- requires JSON body with `username` and `password` from the user

### `GET /balance`
- returns the balance for the users account
- requires the user token in the `Authorization` header

### `POST /transactions/cash-out`
- performs and saves a cash-out/cash-in transaction.
- requires the user token in the `Authorization` header
- requires JSON body with the target `accountId` and `username`, as well as the `value` (as float)

### `GET /transactions`
- returns the users transaction history acording to the query params:
    - `type=in` to get only *cash-in* transactions
    - `type=out` to get only *cash-out* transactions
    - if *type* is not specified returns all transactions