#!/bin/bash

echo ">> Installing Nest.js"
echo ">> It might take a few minutes."
npm install @nestjs/cli -g

echo ">> Installing NPM packages.."
echo ">> It might take a few minutes."
npm install

echo ">> Migrate schema to PostgreSQL"
npx prisma db push

echo ">> Generating prisma schema"
npx prisma generate

echo ">> Starting server..."
npm run start