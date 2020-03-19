const BasicScenario = require('./scenario');
const EventService = require('../event/service/Event');

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
    var scenario = new BasicScenario(loadedEvents, null, null, null, 100);
    scenario.run();
});
