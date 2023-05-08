<p align="left">
  <a href="https://www.multilab.com.pe/" target="blank"><img width='80' src="https://www.multilab.com.pe/img/logo-default.webp" alt="Nest Logo" /></a>
</p>

<h1 align='center'>
  CRM Multilab
</h1>

## Description

Aplicación de lado del servidor para la gestión de clientes (Médicos) relacionados a la empresa [Multilab](https://www.multilab.com.pe/), construída con el framework Nestjs .

## Requirements
- [nodejs](https://nodejs.org/en/) Runtime  para ejecutar javascript de lado del servidor
- [pnpm](https://pnpm.io/installation) package manager
- [Nest cli](https://docs.nestjs.com/cli/overview) Is a command-line interface tool that helps you to initialize, develop, and maintain your Nest applications
- [Docker](https://www.docker.com/) 

## Instalation

```bash
# Clone repository (https or ssh)
git clone https://gitlab.com/mbarrera.multilab/crm-medicos.git
# Dependencies instalation
pnpm install
```

## Environment variables
```bash
# ----
# Copy .env.example file to .env and fill in the variables
# ----

# jwt
#> Secret key to sign the access token
JWT_ACCESS_KEY= 
#> Expiration time of the access token
JWT_ACCESS_EXPIRED=
#> Secret key to sign the refresh token
JWT_REFRESH_KEY=
#> Expiration time of the refresh token
JWT_REFRESH_EXPIRED=
#> Secret key of the optimus API to sign access token
JWT_ACCESS_KEY_OPTIMUS_API=

# Postgres
POSTGRES_DB_HOST=
POSTGRES_DB_PORT=
POSTGRES_DB_USERNAME=
POSTGRES_DB_PASSWORD=
POSTGRES_DB_NAME=

# Apis
#> URL of the optimus API
OPTIMUS_API_URL=
```

## Running the containers
```bash
# Run container in mode detach (-d)
# Services include:
# - MySQL database
# - Postgres database
$ docker-compose up -d
```

## Running the app 
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
