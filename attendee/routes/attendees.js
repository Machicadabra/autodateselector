const Attendee = require('../model/Attendee');
const express = require('express');
const router = express.Router();
const attendeeService = require('../../service/Attendee');

router.get('/:id', function(req, res, next) {
  var service = new attendeeService();
  service.getById(req.params.id).then(value => {
    res.send(value);
  })
});

router.get('/', function(req, res, next) {
  var service = new attendeeService();
  service.getAll().then(value => {
    res.send(value);
  })
});

router.post('/', function(req, res, next) {
    var service = new attendeeService();
    var attendee = new Attendee(req.body.id, req.body.name);
    service.save(attendee);
    res.send('attendee saved!');
});

module.exports = router;
