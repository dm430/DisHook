import { Injectable } from 'container-ioc';
import Guild from '../models/Guild'; 

@Injectable(['QueryBuilder'])
class GuildRepository {
    constructor(queryBuilder) {
        this.queryBuilder = queryBuilder;
    }

    _mapResultsToGuild(results) {
        return results.map(guild => new Guild(guild.GuildId, Guild.Name, guild.Id));
    }

    async createGuild(guildId, name) {
        await this.queryBuilder('Guilds')
            .insert({
                GuildId: guildId,
                Name: name
            });
    }

    async getGuild(guildId) {
        const results = await this.queryBuilder('Guilds')
            .select('Id', 'GuildId', 'Name')
            .where('GuildId', guildId);

        const guilds = this._mapResultsToGuild(results);

        return guilds[0];
    }
}

export default GuildRepository;