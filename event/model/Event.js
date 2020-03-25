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

    setDateInGMT(dateInGMT) {
        this.dateInGMT = dateInGMT;
    }

    setAttendees(attendees) {
        this.attendees = attendees;
    }

    overlaps(event){
        if (this.getId() === event.getId()) {
            return false;
        }
        return this.getDateInGMT().getTime() < event.getEndDateInGMT().getTime()
        && this.getEndDateInGMT().getTime() > event.getDateInGMT().getTime();
    }
}

module.exports = Event;
