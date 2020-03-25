class Basic {
    
    evaluate(individual) {
        if (!individual.hasScore()) {
            individual.setScore(this._calculateScore(individual));
        }
        return individual.getScore();
    }

    _calculateScore(individual) {
        let startScore = 1000;
        let uniqueAttendees = individual.getAttendees();
        uniqueAttendees.forEach(attendee => attendee.setEvents([]));
        let eventsInIndividual = individual.getEvents();
        eventsInIndividual.forEach(eventInIndividual => {
            uniqueAttendees.forEach(uniqueAttendee => {
                let isAttendeeInEvent = !!eventInIndividual.getAttendees().find(attendeeInEvent => attendeeInEvent.getId() === uniqueAttendee.getId());
                if (isAttendeeInEvent) {
                    uniqueAttendee.addEvent(eventInIndividual);
                }
            })
        })

        uniqueAttendees.forEach(attendee => {
            let eventsForAttendee = attendee.getEvents();
            eventsForAttendee.forEach(eventForAttendee => {
                let overlappingEvents = eventsForAttendee.filter(event => event.overlaps(eventForAttendee));
                startScore = startScore - overlappingEvents.length;
            });
        });
        return startScore;
    }

}

module.exports = Basic;
