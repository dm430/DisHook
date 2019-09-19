import { Injectable } from 'container-ioc';
import WebhookEventListener from '../application/webhookEventListener';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['HookManagementService', 'WebhookInvoker', 'Logger'])
class MessageDeleteListener extends WebhookEventListener {
    constructor(hookManagementService, webhookInvoker, logger) {
        super('messageDelete', hookManagementService, webhookInvoker, logger);
    }

    createPayload(guildId, [message]) {
        return PayloadBuilder.createMessageDeletePayload(guildId, message);
    }
}

export default MessageDeleteListener;