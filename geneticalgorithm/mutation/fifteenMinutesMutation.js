const DEFAULT_MUTATION_PROBABILITY = 0.0001;
const MAX_MILLISECONDS_TO_MUTATE = 900000;
const NUMBER_OF_ELITES = 10;

class FifTeenMinutesMutation {

    constructor(mutationProbability, maxMillisecondsToMutate) {
         this.mutationProbability = isNaN(mutationProbability) ? DEFAULT_MUTATION_PROBABILITY : mutationProbability;
         this.maxMillisecondsToMutate = isNaN(maxMillisecondsToMutate) ? MAX_MILLISECONDS_TO_MUTATE : maxMillisecondsToMutate;;
    }

    mutate(population) {
        population.getIndividuals().forEach((individual, index) => {
            if (index > NUMBER_OF_ELITES && Math.random() < this.mutationProbability) {
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
        let fifteenMinutesInMilliseconds = 15 * 60 * 1000;
        let newDateInGMT;
        if (Math.random() > 0.5) {
            newDateInGMT = new Date(event.getDateInGMT().getTime() + fifteenMinutesInMilliseconds);
        } else {
            newDateInGMT = new Date(event.getDateInGMT().getTime() - fifteenMinutesInMilliseconds);
        }
        event.setDateInGMT(newDateInGMT);
    }

}

module.exports = FifTeenMinutesMutation;
