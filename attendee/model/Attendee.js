class Attendee {

    static buildFromAttendee(attendee) {
        return new Attendee(attendee.getId(), attendee.getName());
    }

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.events = [];
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setEvents(events) {
        this.events = events;
    }

    addEvent(event) {
        this.events.push(event);
    }

    getEvents() {
        return this.events;
    }
}

module.exports = Attendee;
