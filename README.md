# Inventaris

### Documentation  :pushpin:
- Documentation :point_right:  **[here!](https://documenter.getpostman.com/view/8708119/SztG3m61?version=latest "here!")**

### Installation

Invetaris requires [Node.js](https://nodejs.org/) v10 to run.

Install the required dependencies and start the server.

```sh
$ git clone https://github.com/toriqvoxel/inventaris.git
$ cd inventaris
$ npm install
$ npm install sequlize sequelize-cli -g
$ sequelize db:create
$ sequelize db:migrate
$ sudo cp .env.example .env
$ npm run start
```
