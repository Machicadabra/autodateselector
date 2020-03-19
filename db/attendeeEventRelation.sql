CREATE TABLE AttendeeEvent (
    attendeeId INT(6) UNSIGNED NOT NULL,
    eventId INT(6) UNSIGNED NOT NULL,
    PRIMARY KEY (attendeeId, eventId),
    FOREIGN KEY (attendeeId) REFERENCES attendee(id) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES event(id) ON DELETE CASCADE
);
