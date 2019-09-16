import WebHook from "../models/webHook";
import Events from '../models/EventEnum';
import { Injectable } from 'container-ioc';

@Injectable(['WebhookRepository'])
class HookManagementService {
    constructor(webhookRepository) {
        this.guildHooks = new Map();
        this.webhookRepository = webhookRepository;
    }

    async getHooks(guildId) {
        let hooks = new Array();
        const result = await this.webhookRepository.getWebhooks(guildId);

        if (result) {
            hooks = result;
        }
        
        return hooks;
    }

    async getHooksForEvent(guildId, event) {
        let hooks = new Array();
        const eventId = Events[event];
        const result = await this.webhookRepository.getWebhooksForGuildEvent(guildId, eventId);

        if (result) {
            hooks = result;
        }

        return hooks;
    }

    async linkHook(guildId, hookName, event) {
        const webhook = await this.webhookRepository.findWebhookForGuild(guildId, hookName);

        if (webhook == null) {
            throw new Error(`Could not locate a hook with the name ${hookName}.`)
        } else {
            const eventId = Events[event];
            await this.webhookRepository.CreateEventWebhookLink(guildId, eventId, webhook);
        }
    }

    async createHook(guildId, hookName, callbackEndpoint) {
        let webhook = await this.webhookRepository.findWebhookForGuild(guildId, hookName);

        if (webhook != null) {
            throw new Error("The specified webhook already exists.");
        } else {
            webhook = new WebHook(hookName, callbackEndpoint);
            await this.webhookRepository.createWebhook(guildId, webhook);
        }
    }
}

export default HookManagementService;


            
