import { Injectable } from 'container-ioc';
import WebhookEventListener from '../application/webhookEventListener';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['HookManagementService', 'WebhookInvoker', 'Logger'])
class MessageUpdateListener extends WebhookEventListener {
    constructor(hookManagementService, webhookInvoker, logger) {
        super('messageUpdate', hookManagementService, webhookInvoker, logger);
    }

    createPayload(guildId, [oldMessage, newMessage]) {
        return PayloadBuilder.createMessageUpdatePayload(guildId, oldMessage, newMessage);
    }
}

export default MessageUpdateListener;