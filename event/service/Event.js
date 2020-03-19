const mysqlconnection = require('../../db/mysqlconnection');
const EventModel = require('../model/Event');
const Attendee = require('../../attendee/model/Attendee')

class Event {

    getAll() {
      let connection = (new mysqlconnection()).getConnection();
        return new Promise((resolve, reject) => {
            connection.connect(err => {
                if (err) reject(err);
                connection.query("SELECT * FROM event", (err, result) => {
                  if (err) reject(err);
                  let events = result.map(eventData => new EventModel(
                    eventData.id,
                    eventData.dateInGMT,
                    eventData.durationInSeconds)
                  );
                  connection.end();
                  resolve(events);
                });
              });
        });
    }

    getById(eventId) {
      let connection = (new mysqlconnection()).getConnection();
      return new Promise((resolve, reject) => {
          connection.connect(err => {
              if (err) reject(err);
              connection.query(`SELECT * FROM event WHERE id = ${eventId} `, (err, result) => {
                if (err) reject(err);
                connection.end();
                resolve(result);
              });
            });
      });
    }

    getAllAttendesByEventId(eventId) {
      let connection = (new mysqlconnection()).getConnection();
      connection = (new mysqlconnection()).getConnection();
      return new Promise((resolve, reject) => {
          connection.connect(err => {
              connection.query(`SELECT * FROM AttendeeEvent AS ae JOIN attendee AS a ON ae.attendeeId = a.id WHERE ae.eventId = ${eventId}; `, (err, result) => {
                if (err) reject(err);
                let attendees = result.map(attendeeData => new Attendee(
                  attendeeData.id,
                  attendeeData.name)
                );
                connection.end();
                resolve(attendees);
              });
            });
      });
    }

    save(event) {
      let connection = (new mysqlconnection()).getConnection();
        var me = this;
        var sqlDate = me.connection.escape(event.dateInGMT);
        connection.connect((err) => {
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