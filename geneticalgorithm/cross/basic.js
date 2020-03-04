class Basic {

    cross(population) {
        let newPopulation = [];
        for (let i=1; i<population.length; i = i+2) {
            let newIndividuals = this.execute(population[i - 1], population[i - 2]);
            newPopulation.push(newIndividuals.child1);
            newPopulation.push(newIndividuals.child2);
        }
        return newPopulation;
    }

    execute(individual1, individual2) {
        let individual1Events = individual1.getEvents();
        let individual2Events = individual2.getEvents();

        let child1 = [];
        let child2 = [];
        
        individual1Events.array.forEach((event, index) => {
            if ((Math.random() * 2) > 1) {
                child1.push(event);
                child2.push(individual2Events[index]);
            } else {
                child2.push(event);
                child1.push(individual2Events[index]);
            }
        });

        return {
            child1: child1,
            child2: child2
        };
    }

}

module.exports = Basic;
