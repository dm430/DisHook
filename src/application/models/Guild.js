class Guild {
    constructor(guildId) {
        this.guildId = guildId;
        this.webHooks = new Map();
        this.eventsHooks = new Map();
    }
}

export default Guild;