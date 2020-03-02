class Attendee {

    static buildFromAttendee(attendee) {
        return new Attendee(attendee.getId(), attendee.getName());
    }

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

module.exports = Attendee;
