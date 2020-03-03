const BasicPopulation = require('./basic');
const IndividualFactory = require('../individual/individualFactory');

class Factory {

    constructor(events, startDateInGMT, endDateInGMT) {
        this.events = events;
        this.startDateInGMT = startDateInGMT;
        this.endDateInGMT = endDateInGMT;
        this.individualFactory = new IndividualFactory();
    }

    buildUnlimitedPopulation(numberOfIndividuals) {
        let individuals = [];
        for (let i = 0; i < numberOfIndividuals; i++) {
            individuals.push(this.individualFactory.buildRandomIndividual(this.events, this.startDateInGMT, this.endDateInGMT));
        }
        return new BasicPopulation(individuals);
    }

    buildPopulationLimitedByDate(numberOfIndividuals) {
        let individuals = [];
        for (let i = 0; i < numberOfIndividuals; i++) {
            individuals.push(this.individualFactory.buildRandomIndividualThatDoNotEndAfterEndDate(this.events, this.startDateInGMT, this.endDateInGMT));
        }
        return new BasicPopulation(individuals);
    }

}

module.exports = Factory;
