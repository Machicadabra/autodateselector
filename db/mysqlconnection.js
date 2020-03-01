const mysql = require('mysql');

class mysqlconnection {

    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "express",
            password: "password",
            database: "autodateselector"
          });
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = mysqlconnection;