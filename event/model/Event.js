class Event {
    constructor(id, dateInGMT, durationInSeconds, attendees) {
        this.id = id;
        this.dateInGMT = dateInGMT;
        this.durationInSeconds = durationInSeconds;
        this.attendees = attendees;
    }

    getId() {
        return this.id;
    }

    getDateInGMT() {
        return this.dateInGMT;
    }

    getDurationInSeconds() {
        return this.durationInSeconds;
    }

    getAttendees() {
        return this.attendees;
    }

    getEndDateInGMT() {
        let endTimeStamp = this.dateInGMT.getTime() + this.durationInSeconds * 1000;
        return new Date(endTimeStamp);
    }
}

module.exports = Event;
