const Population = require('../population/basic');
const Individual = require('../individual/individual');
const NUMBER_OF_ELITES = 10;

class Basic {

    cross(population) {
        let newIndividualsForPopulation = [];
        for(let j = 0; j < NUMBER_OF_ELITES; j++) {
            newIndividualsForPopulation.push(population.getIndividuals()[j]);
        }

        for (let i = 2 + NUMBER_OF_ELITES; i < population.getIndividuals().length + 2; i = i + 2) {
            let newIndividuals = this.execute(population.getIndividuals()[i - 1], population.getIndividuals()[i - 2]);
            newIndividualsForPopulation.push(newIndividuals.child1);
            newIndividualsForPopulation.push(newIndividuals.child2);
        }
        return new Population(newIndividualsForPopulation);
    }

    execute(individual1, individual2) {
        let individual1Events = individual1.getEvents();
        let individual2Events = individual2.getEvents();

        let child1 = [];
        let child2 = [];
        
        individual1Events.forEach((event, index) => {
            if ((Math.random() * 2) > 1) {
                child1.push(event);
                child2.push(individual2Events[index]);
            } else {
                child2.push(event);
                child1.push(individual2Events[index]);
            }
        });

        return {
            child1: new Individual(child1),
            child2: new Individual(child2)
        };
    }

}

module.exports = Basic;
