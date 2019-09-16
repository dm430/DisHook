class Guild {
    constructor(guildId, name, id) {
        this.id = id;
        this.guildId = guildId;
        this.name = name;
        this.webHooks = new Map();
        this.eventsHooks = new Map();
    }
}

export default Guild;