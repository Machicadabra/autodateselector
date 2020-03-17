const Attendee = require('../attendee/model/Attendee');
const PopulationFactory = require('./population/factory');
const IndividualFactory = require('./individual/individualFactory');
const BasicTournament = require('./tournament/basic');
const BasicCross = require('./cross/basic');
const BasicMutation = require('./mutation/basic');
const Evaluationfunction = require('./evaluation/basic');

class Scenario {

    constructor(events, mutation, evaluation, tournament, iterations) {
        this.populationSize = 100;
        this.numberOfElites = 4;
        this.events = events;
        this.startDate = new Date();
        this.evaluationFunction = new Evaluationfunction();
        this.endDate = new Date(this.startDate.getTime() + 1000 * 4 * 60 * 60);
        /*this.mutation = mutation;
        this.evaluation = evaluation;
        this.tournament = tournament;*/
        this.iterations = iterations;
        this.attendees = this._calculateUniqueAttendees();
        this.individualFactory = new IndividualFactory(this.events, this.startDate, this.endDate);
        this.populationFactory = new PopulationFactory(this.events, this.startDate, this.endDate);
        this.tournament = new BasicTournament(this.evaluationFunction, this.numberOfElites, this.individualFactory);
        this.cross = new BasicCross();
        this.mutation = new BasicMutation();
    }

    run() {
        console.log(`start execution of ${this.iterations} iterations for ${this.events.length} events between 
        ${this.startDate}
        ${this.endDate}`);
        let population = this.populationFactory.buildPopulationLimitedByDate(this.populationSize);
        for (let i = 0; i < this.iterations; i++) {
            population = this.tournament.fight(population);
            population = this.cross.cross(population);
            this.mutation.mutate(population);
            population.sort();
            console.log(`Best individual for iteration ${i}: ${population.getIndividuals()[0].getScore()}`);
        }
        //this._printBesIndividual(population);
        //this._printAttendeesEvents(population.getIndividuals[0]);
        //this._printScores(population);
        return population.getIndividuals()[0];
    }

    _printBesIndividual(population) {
        let bestIndividual = population.getIndividuals()[0];
        let eventsOfBestIndividual = bestIndividual.getEvents();
        eventsOfBestIndividual.forEach(event => {
            console.log(`${this._formatDate(event.getDateInGMT())} - ${this._formatDate(event.getEndDateInGMT())}`);
        });
    }

    _printAttendeesEvents(individual) {
        let attendees = [];
        let events = individual.getEvens();
        events.forEach(event => {
            attendees = attendees.concat(event.getAttendees());
        });
        attendees.forEach(attendee => {
            console.log(`${attendee.getId()} - ${attendee.getName()}`);
        });
    }

    _printScores(population) {
        population.sort();
        population.getIndividuals().forEach(individual => {
            console.log(this.evaluationFunction.evaluate(individual));
        });
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

    _formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    }

} 

module.exports = Scenario;