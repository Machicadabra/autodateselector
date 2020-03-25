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
    var scenario = new BasicScenario(loadedEvents, null, null, null, 1000);
    var bestIndividual = scenario.run();
    var events = bestIndividual.getEvents();
    events.sort((event1, event2) => {
        return event1.getDateInGMT().getTime() - event2.getDateInGMT().getTime();
    }); 
    events.forEach(event => {
        console.log(`${event.getDateInGMT()} - ${event.getEndDateInGMT()} + [${event.getAttendees().map(attendee=>attendee.getId()).join(',')}]`);
    });
});
