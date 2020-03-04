const Individual = require('./individual');

class IndividualFactory {

    constructor(events, startDateInGMT, endDateInGMT) {
        this.events = events;
        this.startDateInGMT = startDateInGMT;
        this.endDateInGMT = endDateInGMT;
    }

    buildRandomIndividual() {
        return randomPositionedEvents = this.events.map(event => {
            let clonedEvent = {...event};
            clonedEvent.startDateInGMT(this._calculateRandomDateBetweenStartAndEnd(this.event, this.startDateInGMT, this.endDateInGMT));
            return clonedEvent;
        });
    }

    buildRandomIndividualThatDoNotEndAfterEndDate() {
        return randomPositionedEvents = this.events.map(event => {
            let clonedEvent = {...event};
            clonedEvent.startDateInGMT(this._calculateRandomDateThatDoNotEndAfterEndDate(this.event, this.startDateInGMT, this.endDateInGMT));
            return clonedEvent;
        });
    }

    _calculateRandomDateBetweenStartAndEnd(event, startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime();
        let dateOffset = Math.random() * availableRangeInSeconds;
        return new Date(dateOffset);
    }

    _calculateRandomDateThatDoNotEndAfterEndDate(event, startDateInGMT, endDateInGMT) {
        let availableRangeInSeconds = endDateInGMT.getTime() - startDateInGMT.getTime() - event.getDurationInSeconds() * 1000;
        let dateOffset = Math.random() * availableRangeInSeconds;
        return new Date(dateOffset);
    }
}

module.exports = IndividualFactory;
