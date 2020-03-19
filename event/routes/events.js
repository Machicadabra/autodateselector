const Event = require('../model/Event');
const express = require('express');
const router = express.Router();
const EventService = require('../service/Event');

router.get('/:id', function(req, res, next) {
  var service = new EventService();
  service.getById(req.params.id).then(value => {
    res.send(value);
  })
});

router.get('/', function(req, res, next) {
  var service = new EventService();
  var loadedEvents = [];
  service.getAll().then(events => {
    loadedEvents = events;
    let promises = events.map(event => {
        return service.getAllAttendesByEventId(event.getId()).then(attendees => event.setAttendees(attendees));
      }
    )
    return Promise.all(promises);
  }).then(() => {
    res.send(loadedEvents);
  });
});

router.post('/', function(req, res, next) {
    var service = new EventService();
    var event = new Event(req.body.id, new Date(req.body.dateInGMT), req.body.durationInSeconds, []);
    service.save(event);
});

module.exports = router;
