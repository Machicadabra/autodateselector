const Individual = require('./individual');

class IndividualFactory {

    buildRandomIndividual(events, startDateInGMT, endDateInGMT) {
        let randomPositionedEvents = events.map(event => {
            let clonedEvent = {...event};
            clonedEvent.startDateInGMT(this._calculateRandomDateBetweenStartAndEnd(event, startDateInGMT, endDateInGMT));
            return clonedEvent;
        });
    }

    buildRandomIndividualThatDoNotEndAfterEndDate(events, startDateInGMT, endDateInGMT) {
        let randomPositionedEvents = events.map(event => {
            let clonedEvent = {...event};
            clonedEvent.startDateInGMT(this._calculateRandomDateThatDoNotEndAfterEndDate(event, startDateInGMT, endDateInGMT));
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
