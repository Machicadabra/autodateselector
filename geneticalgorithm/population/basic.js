const EvaluationFunction = require('../evaluation/basic');

class Basic {

    constructor(individuals, evaluationFunction) {
        this.individuals = individuals;
        this.evaluationFunction = evaluationFunction || new EvaluationFunction();
    }

    getIndividuals() {
        return this.individuals;
    }

    sort() {
        this.individuals.sort((individual1, individual2) => {individual1
            return this.evaluationFunction.evaluate(individual2) - this.evaluationFunction.evaluate(individual1);
        });
    }

}

module.exports = Basic;
