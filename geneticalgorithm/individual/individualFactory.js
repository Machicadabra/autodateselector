const Individual = require('./individual');
const Event = require('../../event/model/Event');

class IndividualFactory {

    constructor(events, startDateInGMT, endDateInGMT) {
        this.events = events;
        this.startDateInGMT = startDateInGMT;
        this.endDateInGMT = endDateInGMT;
    }

    buildRandomIndividual() {
        let randomPositionedEvents = this.events.map(event => {
            let clonedEvent = new Event(event.getId(), event.getDateInGMT(), event.getDurationInSeconds(), event.getAttendees());
            clonedEvent.setDateInGMT(this._calculateRandomDateBetweenStartAndEndFifteenMinutes(this.startDateInGMT, this.endDateInGMT));
            return clonedEvent;
        });
        return new Individual(randomPositionedEvents);
    }

    buildRandomIndividualThatDoNotEndAfterEndDate() {
        let randomPositionedEvents = this.events.map(event => {
            let clonedEvent = new Event(event.getId(), event.getDateInGMT(), event.getDurationInSeconds(), event.getAttendees());
            clonedEvent.setDateInGMT(this._calculateRandomDateThatDoNotEndAfterEndDateFifteenMinutes(clonedEvent.getDurationInSeconds(), this.startDateInGMT, this.endDateInGMT));
            return clonedEvent;
        });
        return new Individual(randomPositionedEvents);
    }

    /*_calculateRandomDateBetweenStartAndEnd(startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime();
        let dateOffset = Math.random() * availableRangeInSeconds;
        return new Date(startDateInGMT.getTime() + dateOffset);
    }

    _calculateRandomDateThatDoNotEndAfterEndDate(durationInSeconds, startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime() - durationInSeconds * 1000;
        let dateOffset = Math.random() * availableRangeInSeconds;
        return new Date(startDateInGMT.getTime() + dateOffset);
    }*/

    _calculateRandomDateBetweenStartAndEndFifteenMinutes(startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime();
        let dateOffset = Math.random() * availableRangeInSeconds;
        let dateOffsetRest = dateOffset % (15 * 60 * 1000);
        return new Date(startDateInGMT.getTime() + dateOffset - dateOffsetRest);
    }

    _calculateRandomDateThatDoNotEndAfterEndDateFifteenMinutes(durationInSeconds, startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime() - durationInSeconds * 1000;
        let dateOffset = Math.random() * availableRangeInSeconds;
        let dateOffsetRest = dateOffset % (15 * 60 * 1000);
        return new Date(startDateInGMT.getTime() + dateOffset - dateOffsetRest);
    }
}

module.exports = IndividualFactory;
