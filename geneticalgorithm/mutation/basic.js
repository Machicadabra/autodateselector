const DEFAULT_MUTATION_PROBABILITY = 0.01;
const MAX_MILLISECONDS_TO_MUTATE = 900000;

class Basic {

    constructor(mutationProbability, maxMillisecondsToMutate) {
         this.mutationProbability = isNaN(mutationProbability) ? DEFAULT_MUTATION_PROBABILITY : mutationProbability;
         this.maxMillisecondsToMutate = isNaN(maxMillisecondsToMutate) ? MAX_MILLISECONDS_TO_MUTATE : maxMillisecondsToMutate;;
    }

    mutate(population) {
        population.getIndividuals().forEach(individual => {
            if (Math.random() < this.mutationProbability) {
                this._mutateIndividual(individual);
            }
        });
    }

    _mutateIndividual(individual) {
        let events = individual.getEvents();
        let numberOfEvents = events.length;
        this._mutateEvent(events[Math.floor(Math.random() * numberOfEvents)]);
    }

    _mutateEvent(event) {
        let randoSecondsToAdd = (this.maxMillisecondsToMutate * 2 * Math.random()) - this.maxMillisecondsToMutate;
        let newDateInGMT = new Date(event.getDateInGMT().getTime() + randoSecondsToAdd);
        event.setDateInGMT(newDateInGMT);
    }

}

module.exports = Basic;
