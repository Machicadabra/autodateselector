class Basic {
    
    evaluate(individual) {
        if (!individual.hasScore()) {
            individual.setScore(this._calculateScore());
        }
        return individual.getScore();
    }

    _calculateScore() {
        return Math.round(Math.random() * 1000);
    }

}

module.exports = Basic;
