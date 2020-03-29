# Library Loan Book API

## Table of Contents

- [Prerequiste](#prerequiste)
- [Instalation](#installation)


- [Link Collection Postman](#link-collection-postman)
- [Structur Folder](#structur-folder)
- [Contributors](#contributors)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.  

## Installation
### Clone
```
$ git clone ttps://github.com/muhammadrisano/Library-book-backend-expressjs.git
$ cd Library-book-backend-expressjs
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=8000

```
### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[Postman](https://www.getpostman.com/collections/bb923819853137d50b60)

## Structure Folder
```
\---src
|    \---config
|    |   +---db.js            
|    \---controller
|    |   +---book.js
|    |   +---user.js
|    \---helper
|    |   +---helper.js
|    \---model
|    |   +---books.js
|    |   +---user.js
|    \---router
|    |   +---books.js
|    |   +---index.js
|    |   +---register.js
|    |   +---user.js
+---app.js
```

### License
----

[Website](http://www.sekolahinovator.org) © [Rahmat Hidayatullah](https://github.com/HiRahmat-Dev/)