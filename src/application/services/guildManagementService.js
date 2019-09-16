import { Injectable } from 'container-ioc';

@Injectable(['GuildRepository'])
class GuildManagementService {
    constructor(guildRepository) {
        this.guildRepository = guildRepository;
    }

    async createGuild(guildId, name) {
        const guild = await this.guildRepository.getGuild(guildId);

        if (guild == null) {
            await this.guildRepository.createGuild(guildId, name);
        }
    }
}

export default GuildManagementService;