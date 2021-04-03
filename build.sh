#!/bin/bash

# make sure you have composer and npm installed on your machine
# make sure your database connection up
# and have created a database (check for the .env file in 'DB_DATABASE' value for your database name)

composer install
npm install
php artisan migrate:fresh
php artisan passport:install --force
php artisan db:seed
