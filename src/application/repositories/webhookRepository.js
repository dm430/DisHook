import { Injectable } from 'container-ioc';
import Webhook from '../models/webHook'; 

@Injectable(['QueryBuilder'])
class WebhookRepository {
    constructor(queryBuilder) {
        this.queryBuilder = queryBuilder;
    }

    _mapResultsToWebhook(results) {
        return results.map(webhook => new Webhook(webhook.Name, webhook.CallbackEnpoint, webhook.Id));
    }

    async getWebhooksForGuildEvent(guildId, eventId) {
        const results = await this.queryBuilder('Webhooks')
            .join('GuildEventHooks', 'GuildEventHooks.webhookId', 'Webhooks.Id')
            .join('Guilds', 'Guilds.id', 'GuildEventHooks.GuildId')
            .select('Webhooks.Id', 'Webhooks.Name', 'Webhooks.CallbackEnpoint')
            .where('Guilds.GuildId', guildId)
            .andWhere('GuildEventHooks.EventId', eventId);

        const webhooks = this._mapResultsToWebhook(results);

        return webhooks;
    }

    async getWebhooks(guildId) {
        const results = await this.queryBuilder('GuildWebhooks')
            .join('Webhooks', 'Webhooks.Id', 'GuildWebhooks.WebhookId')
            .join('Guilds', 'Guilds.Id', 'GuildWebhooks.GuildId')
            .select('Webhooks.Id', 'Webhooks.Name', 'Webhooks.CallbackEnpoint')
            .where('Guilds.GuildId', guildId)

        const webhooks = this._mapResultsToWebhook(results);

        return webhooks;
    }

    async findWebhookForGuild(guildId, webhookName) {
        const results = await this.queryBuilder('GuildWebhooks')
            .join('Webhooks', 'Webhooks.Id', 'GuildWebhooks.WebhookId')
            .join('Guilds', 'Guilds.Id', 'GuildWebhooks.GuildId')
            .select('Webhooks.Id', 'Webhooks.Name', 'Webhooks.CallbackEnpoint')
            .where('Guilds.GuildId', guildId)
            .andWhere('Webhooks.Name', webhookName);

        const webhooks = this._mapResultsToWebhook(results);

        return webhooks[0];
    }

    async CreateEventWebhookLink(guildId, eventId, webhook) {
        const guildIdQuery = this.queryBuilder('Guilds')
            .select('Id')
            .where('GuildId', guildId)
        
        await this.queryBuilder('GuildEventHooks')
            .insert({
                GuildId: guildIdQuery,
                EventId: eventId,
                webhookId: webhook.id
            });
    }

    async createWebhook(guildId, webhook) {
        const transactionProvider = this.queryBuilder.transactionProvider();
        const transaction = await transactionProvider();

        const webhookIds = await transaction('Webhooks')
            .returning('Id')
            .insert({
                Name: webhook.name,
                CallbackEnpoint: webhook.callbackEndpoint
            });

        const guildIdQuery = this.queryBuilder('Guilds')
            .select('Id')
            .where('GuildId', guildId)

        await transaction('GuildWebhooks')
            .insert({
                GuildId: guildIdQuery,
                WebhookId: webhookIds[0]
            });

        transaction.commit();
    }
}

export default WebhookRepository;