#!/bin/sh

echo "Running migrations..."
npm run migrate up

echo "Running seed..."

npm run seed

echo "Starting API..."

npm start