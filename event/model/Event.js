class Event {
    constructor(id, dateInGMT, durationInSeconds, attendees) {
        this.id = id;
        this.dateInGMT = dateInGMT;
        this.durationInSeconds = durationInSeconds;
        this.attendees = attendees;
    }
}

module.exports = Event;
