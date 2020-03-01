const mysqlconnection = require('../db/mysqlconnection');

class Event {

    constructor() {
        this.connection = (new mysqlconnection()).getConnection();
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) reject(err);
                this.connection.query("SELECT * FROM event", function (err, result) {
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
              this.connection.query(`SELECT * FROM event WHERE id = ${eventId} `, function (err, result) {
                if (err) reject(err);
                resolve(result);
              });
            });
      });
    }

    save(event) {
        var me = this;
        var sqlDate = me.connection.escape(event.dateInGMT);
        this.connection.connect(function(err) {
            if (err) throw err;
            var sql = `INSERT INTO event (name, dateInGMT, durationInSeconds) VALUES 
            ('${event.name}',${sqlDate}, ${event.durationInSeconds})`;
            me.connection.query(sql, function (err, result) {
              if (err) throw err;
            });
          });
    }
}

module.exports = Event;