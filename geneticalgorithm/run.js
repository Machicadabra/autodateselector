const BasicScenario = require('./scenario');
const Event = require('../event/model/Event');
const Attendee = require('../attendee/model/Attendee');

let attendee1Paco = new Attendee(1, 'Paco');
let attendee2Juan = new Attendee(2, 'Juan');
let attendee3Carlos = new Attendee(3, 'Carlos');
let attendee4Pepe = new Attendee(4, 'Pepe');

let grupo1 = [
    attendee1Paco,
    attendee2Juan,
    attendee3Carlos,
    attendee4Pepe
];
let grupo2 = [
    attendee1Paco,
    attendee4Pepe
];
let grupo3 = [
    attendee2Juan,
    attendee4Pepe
];
let grupo4 = [
    attendee1Paco,
    attendee2Juan,
    attendee3Carlos
];

let event1 = new Event(1, new Date(), 3600, grupo1);
let event2 = new Event(1, new Date(), 3600, grupo2);
let event3 = new Event(1, new Date(), 3600, grupo2);
let event4 = new Event(1, new Date(), 3600, grupo1);
let event5 = new Event(1, new Date(), 3600, grupo3);
let event6 = new Event(1, new Date(), 3600, grupo4);



var events = [
    event1,
    event2,
    event3,
    event4,
    event5,
    event6
];

var scenario = new BasicScenario(events, null, null, null, 100);
scenario.run();