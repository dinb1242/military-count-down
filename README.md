# military-count-down


## Description
A military discharge date calculator and company wiki toy project for myself and coworkers for fun.
<br/><br/>
This project consists of the left days of military duty and some wiki about the company where I worked as a skilled
industrial personnel agent.

## Tech stacks

<div align="center">
  <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img alt="Next.js" src ="https://img.shields.io/badge/Next.js-000000.svg?&style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img alt="Nest.js" src ="https://img.shields.io/badge/NestJS-E0234E.svg?&style=for-the-badge&logo=NestJS&logoColor=white"/>
  <img alt="Docker" src ="https://img.shields.io/badge/Docker-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
  <br/>
  <img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
  <img alt="Prisma" src ="https://img.shields.io/badge/Prisma-2D3748.svg?&style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img alt="TailwindCSS" src ="https://img.shields.io/badge/TailwindCSS-06B6D4.svg?&style=for-the-badge&logo=TailwindCSS&logoColor=white"/>


</div>

## Pre-requisites
- Git
- Docker
- Docker Compose

## Installiation
1. Clone this repository using the command below where you want.
```
>> git clone https://github.com/dinb1242/military-count-down.git
```

2. Move to the directory where you have cloned, find `docker-compose.yml`, and modify the postgreSQL db, username, and password what you want to use.
<br/><br/>
<b>You have to modify `.env` file too (datasource such as DB, username, password in this file must match up with `db.environment` in `docker-compose.yml`)</b>
```
>> cd ./military-count-down
```
```yaml
  # docker-compose.yml
  # Modify the db.environment.
  db:
    container_name: military-count-down-postgres
    image: postgres:15
    environment:
      - POSTGRES_DB=local
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    networks:
      - military-count-down
```
<br/>

3. Move to the `server` directory, create `.env` file to specify the postgreSQL datasource and fill in the below code.<br/><br/>
<b>Note that the datasource must match up with `db.environment` in docker-compose.yml</b>
```
# Create .env in server directory.
>> cd ./server
>> touch .env
```
```
# .env
DATABASE_URL="postgresql://username:password@military-count-down-postgres:5432/db_name?schema=schema_name"
JWT_KEY=A_JWT_key_what_you_want_to_use
``` 
<br/>

4. Before execute the docker compose command, you have to create a new docker network named `military-count-down` by typing the command below.<br/><br/>
Otherwise, you can just remove docker compose network setting by modifying `networks` property in docker-compose.yml. <b>(If you decide this way, you can skip this step.)</b><br/><br/>
To create a docker network, execute the command below.
```
>> docker network create military-count-down
```
<br/>

5. Move to the root directory and type the command below to set up the whole projects.
```
# Move to the root directory and build.
>> cd ..
>> docker compose up --build -d
```
<br/>

6. Once the docker compose command finished, you can check the status using the command below.
```
>> docker compose ps
```

```
# Results
NAME                           COMMAND                  SERVICE             STATUS              PORTS
military-count-down-postgres   "docker-entrypoint.s…"   db                  running             0.0.0.0:5432->5432/tcp, :::5432->5432/tcp
military-count-down-server-1   "/bin/sh -c ./entryp…"   server              running             0.0.0.0:8080->8080/tcp, :::8080->8080/tcp
military-count-down-web-1      "npm run start"          web                 running             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp
```
<br/>

7. If some containers are not running, then you can run those by using the command below.
```
>> docker compose start # Whole containers will be started.
>> docker compose start [service name] # [service name] container will be starte.
```

## Features
