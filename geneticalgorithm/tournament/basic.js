const DEFAULT_NUMBER_OF_ELITES = 10;

class Basic {

    constructor(evaluationFunction, numberOfElites, individualFactory) {
        this.evaluationFunction = evaluationFunction;
        this.numberOfElites = isNaN(numberOfElites) ? DEFAULT_NUMBER_OF_ELITES : numberOfElites;
        this.individualFactory = individualFactory;
    }
    
    fight(population) {
        population.sort((individual1, individual2) => {
            return this.evaluationFunction(individual1) - this.evaluationFunction(individual2);
        });
        let newPopulation = [];
        //best individuals are populated to the next iteration automatically
        for (let i = 0; i < Math.min(population.lenght, DEFAULT_NUMBER_OF_ELITES); i++) {
            newPopulation.push(population.splice(i, 1));
        }

        while (population.length) {
            let individual1 = population.splice(Math.round(Math.random() * (population.length - 1)), 1);
            let individual2 = population.splice(Math.round(Math.random() * (population.length - 1)), 1);
            newPopulation.push(this._doCombat(individual1, individual2));
            newPopulation.push(this.individualFactory.buildRandomIndividual())
        }
        return newPopulation;
    }

    _doCombat(individual1, individual2) {
        return this.evaluationFunction(individual1) > this.evaluationFunction(individual2)
            ? individual1
            : individual2;
    }
    
}

module.exports = Basic;
