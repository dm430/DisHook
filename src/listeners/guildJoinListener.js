import { Listener } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['GuildManagementService', 'Logger'])
class GuildJoinListener extends Listener {
    constructor(guildManagementService, logger) {
        super('guildCreate', {
            emitter: 'client',
            eventName: 'guildCreate'
        });

        this.guildManagementService = guildManagementService;
        this.logger = logger;
    }

    async exec(guild) {
        try {
            await this.guildManagementService.createGuild(guild.id, guild.name);
        } catch(error) {
            this.logger.error(error.toString());
        }
    }
}

export default GuildJoinListener;