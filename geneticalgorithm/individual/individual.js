class Individual {

    constructor(events) {
        this.events = events;
        this.score = undefined;
    }

    getEvents() {
        return this.events;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    hasScore() {
        return !isNaN(this.score);
    }

    getAttendees() {
        return this._calculateUniqueAttendees();
    }

    _calculateUniqueAttendees() {
        let allAttenddesWithDuplicatedItems = this.events.map(event => event.getAttendees()).flat();
        return this._filterUniqueAttendees(allAttenddesWithDuplicatedItems);
    }

    _filterUniqueAttendees(attendeesWithDuplicated) {
        const result = [];
        const map = new Map();
        for (const attendee of attendeesWithDuplicated) {
            if(!map.has(attendee.getId())){
                map.set(attendee.getId(), true);
                result.push(attendee);
            }
        }
        return result;
    }

}

module.exports = Individual;
