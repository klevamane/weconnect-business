[![Build Status](https://travis-ci.org/klevamane/weconnect-business.svg?branch=master)](https://travis-ci.org/klevamane/weconnect-business) [![Coverage Status](https://coveralls.io/repos/github/klevamane/weconnect-business/badge.svg)](https://coveralls.io/github/klevamane/weconnect-business) [![Maintainability](https://api.codeclimate.com/v1/badges/85bfcac789b904e3491c/maintainability)](https://codeclimate.com/github/klevamane/weconnect-business/maintainability)


# WEconnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

# Getting Started

## Prerequisite
1. Internet connection
2. Internet browser
3. Nodejs
4. git

## URL
* https://klevamane.github.io/weconnect-business/template/index.html

## How to get a local copy
#### Clone repository
* Copy repository link
* Create a folder location in your computer eg my/path/
* cd my/path/
* git clone repositorylink.git
* cd we-connect-business
* npm install
* npm run dev
* open index.html file
* Sign-in with any dummy email id and passowrd

## Routes

* POST http://localhost:3000/api/v1/businesses - Register a new Business
* PUT http://localhost:3000/api/v1/businesses/:id - Update a business
* GET http://localhost:3000/api/v1/businesses - List all businesses
* GET http://localhost:3000/api/v1/businesses/:id - List details of a single business
* DELETE http://localhost:3000/api/v1/businesses/:id - Deletes a business
* POST http://localhost:3000/api/v1/businesses/review/:id - Add review for a business
* GET http://localhost:3000/api/v1/businesses/review/:id - list all review(s) for a business
* POST http://localhost:3000/api/v1/auth/signup - Register a new user
* POST http://localhost:3000/api/v1/auth/login - Authenticate registered user

## Branches
The branches are structured in a way that they correspond to feature developed in the application. for example the with name a ft-login-xxxx corresponds codes for the log in page and ft-signup-xxx corresponds to codes for the signup page, some other branches to update user interface and implement quick fix also exist.
The develop branch is positioned currently as the default branch due to the on-going nature of this project. It is expected that as the project nears completion some branches will be merged and completely deleted


# Built with
1. Html and Css
2. Bootstrap
3. JQuery

# Contributors
* Onengiye Richard (klevamane)
# Author
* Onengiye Richard (klevamane)
