#!/bin/bash

echo ">> Installing NPM packages.."
echo ">> It might take a few minutes."
npm install --force

echo ">> Building clinet"
npm run build

echo ">> Starting client server"
npm run start