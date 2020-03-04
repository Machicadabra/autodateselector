const Attendee = require('../attendee/model/Attendee');
const PopulationFactory = require('./population/factory');
const IndividualFactory = require('./individual/individualFactory');
const BasicTournament = require('./tournament/basic');
const BasicCross = require('./cross/basic');
const BasicMutation = require('./mutation/basic');

class Scenario {

    constructor(events, mutation, evaluation, tournament, iterations) {
        this.events = events;
        /*this.mutation = mutation;
        this.evaluation = evaluation;
        this.tournament = tournament;*/
        this.iterations = iterations;
        this.attendees = this._calculateUniqueAttendees();
        this.individualFactory = new IndividualFactory();
        this.populationFactory = new PopulationFactory(this.individualFactory);
        this.tournament = new BasicTournament(this.individualFactory);
        this.cross = new BasicCross();
        this.mutation = new BasicMutation();
    }

    run() {
        let population = this.populationFactory.buildPopulationLimitedByDate();
        for (let i = 0; i < this.iterations; i++) {
            population = this.tournament.fight(population);
            population = this.cross.cross(population);
            this.mutation.mutate(population);
        }
        return population.getIndividuals()[0];
    }

    _calculateUniqueAttendees() {
        let allAttenddesWithDuplicatedItems = this.events.map(event => event.getAttendees()).flat();
        return this._filterUniqueAttendees(allAttenddesWithDuplicatedItems);
    }

    _filterUniqueAttendees(attendeesWithDuplicated) {
        const result = [];
        const map = new Map();
        for (const attendee of attendeesWithDuplicated) {
            if(!map.has(attendee.getId())){
                map.set(attendee.getId(), true);
                result.push(new Attendee(attendee));
            }
        }
        return result;
    }

} 

module.exports = Scenario;