# node-api

Node JS CRUD API Example

- [x] store info in [JSON file](data/tasks.json)
- [ ] store info in DB [MySQL](https://www.mysql.com/)
- [ ] store info in file similar to mongo format (check https://github.com/sergeyksv/tingodb)
- [x] UI Example for this app can be found in [constantinraulivan/to-do-list](https://github.com/constantinraulivan/to-do-list)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [JSON file as storage](#json-file-as-storage)
- [DB (MySQL) as storage](#db-mysql-as-storage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
git clone https://github.com/constantinraulivan/to-do-list-api.git
cd to-do-list-api
npm install
```

## Usage

```sh
npm start
# or (when you work inside code and want auto restart)
npm run devstart
```

Open http://localhost:3000 to see if it works

## JSON file as storage

Tasks are stored inside [data/tasks.json](data/tasks.json)

```js
// GET tasks-json
fetch("http://localhost:3000/tasks-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

// POST tasks-json/create
fetch("http://localhost:3000/tasks-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Clean toilet",
  })
});

// DELETE tasks-json/delete
fetch("http://localhost:3000/tasks-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT tasks-json/update
fetch("http://localhost:3000/tasks-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "fedcba1610310163146",
    name: "Water plants",
    completed: "true";
  })
});
```

<!-- ## DB (MySQL) as storage

Tasks are stored in [MySQL](https://www.mysql.com/)

- configure user & pass for mysql connection [routes/tasks-db.js](routes/tasks-db.js)
- create a database named **tasks**
- run [http://localhost:3000/tasks/install](http://localhost:3000/tasks/install)
- now you can run all CRUD operations
  - the same as for json but change url **"tasks-json" -> "tasks"** -->
