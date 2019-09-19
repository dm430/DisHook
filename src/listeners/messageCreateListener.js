import { Injectable } from 'container-ioc';
import WebhookEventListener from '../application/webhookEventListener';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['AkairoClient', 'HookManagementService', 'WebhookInvoker', 'Logger'])
class MessageCreateListener extends WebhookEventListener {
    constructor(client, hookManagementService, webhookInvoker, logger) {
        super('message', hookManagementService, webhookInvoker, logger);

        this.client = client;
    }

    createPayload(guildId, [message]) {
        return PayloadBuilder.createMessagePayload(guildId, message);
    }

    async exec(message) {
        if (message.author.id != this.client.user.id) {
            await super.exec(message);
        }
    }
}

export default MessageCreateListener;