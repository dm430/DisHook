class EventPayload {
    constructor(guildId, eventName, payload) {
        this.guildId = guildId;
        this.eventName = eventName;
        this.payload = payload;
    }
}

export default EventPayload;