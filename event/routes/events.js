const Event = require('../model/Event');
const express = require('express');
const router = express.Router();
const eventService = require('../service/Event');

router.get('/:id', function(req, res, next) {
  var service = new eventService();
  service.getById(req.params.id).then(value => {
    res.send(value);
  })
});

router.get('/', function(req, res, next) {
  var service = new eventService();
  var loadedEvents = [];
  service.getAll().then(events => {
    loadedEvents = events;
    let promises = events.map(event => {
        return service.getAllAttendesByEventId(event.getId()).then(attendees => event.setAttendees(attendees));
      }
    )
    return Promise.all(promises);
  }).then(attendees => {
    res.send(loadedEvents);
  });
});

router.post('/', function(req, res, next) {
    var service = new eventService();
    var event = new Event(req.body.id, new Date(req.body.dateInGMT), req.body.durationInSeconds, []);
    service.save(event);
});

module.exports = router;
