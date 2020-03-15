const Population = require('../population/basic');
const DEFAULT_NUMBER_OF_ELITES = 10;

class Basic {

    constructor(evaluationFunction, numberOfElites, individualFactory) {
        this.evaluationFunction = evaluationFunction;
        this.numberOfElites = isNaN(numberOfElites) ? DEFAULT_NUMBER_OF_ELITES : numberOfElites;
        this.individualFactory = individualFactory;
    }
    
    fight(population) {
        population.getIndividuals().sort((individual1, individual2) => {
            return this.evaluationFunction.evaluate(individual1) - this.evaluationFunction.evaluate(individual2);
        });
        let newIndividuals = [];
        //best individuals are populated to the next iteration automatically
        for (let i = 0; i < Math.min(population.getIndividuals().length, DEFAULT_NUMBER_OF_ELITES); i++) {
            newIndividuals.push(population.getIndividuals().splice(i, 1)[0]);
        }

        while (population.getIndividuals().length) {
            let individual1 = population.getIndividuals().splice(Math.round(Math.random() * (population.getIndividuals().length - 1)), 1)[0];
            let individual2 = population.getIndividuals().splice(Math.round(Math.random() * (population.getIndividuals().length - 1)), 1)[0];
            newIndividuals.push(this._doCombat(individual1, individual2));
            newIndividuals.push(this.individualFactory.buildRandomIndividual())
        }
        return new Population(newIndividuals);
    }

    _doCombat(individual1, individual2) {
        return this.evaluationFunction.evaluate(individual1) > this.evaluationFunction.evaluate(individual2)
            ? individual1
            : individual2;
    }
    
}

module.exports = Basic;
