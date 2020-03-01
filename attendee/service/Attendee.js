const mysqlconnection = require('../../db/mysqlconnection');

class Attendee {

    constructor() {
        this.connection = (new mysqlconnection()).getConnection();
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) reject(err);
                this.connection.query("SELECT * FROM attendee", function (err, result) {
                  if (err) reject(err);
                  resolve(result);
                });
              });
        });
    }

    getById(eventId) {
      return new Promise((resolve, reject) => {
          this.connection.connect(err => {
              if (err) reject(err);
              this.connection.query(`SELECT * FROM attendee WHERE id = ${eventId} `, function (err, result) {
                if (err) reject(err);
                resolve(result);
              });
            });
      });
    }

    save(attendee) {
        var me = this;
        this.connection.connect(function(err) {
            if (err) throw err;
            var sql = `INSERT INTO attendee (name) VALUES ('${attendee.name}')`;
            me.connection.query(sql, function (err, result) {
              if (err) throw err;
            });
          });
    }
}

module.exports = Attendee;