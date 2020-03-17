class Individual {

    constructor(events) {
        this.events = events;
        this.score = undefined;
    }

    getEvents() {
        return this.events;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    hasScore() {
        return !isNaN(this.score);
    }

}

module.exports = Individual;
