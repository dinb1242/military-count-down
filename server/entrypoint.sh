#!/bin/bash

echo ">> Migrate schema to PostgreSQL"
npx prisma db push

echo ">> Generating prisma schema"
npx prisma generate

echo ">> Starting server..."
npm run start