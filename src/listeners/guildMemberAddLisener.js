import { Injectable } from 'container-ioc';
import WebhookEventListener from '../application/webhookEventListener';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['HookManagementService', 'WebhookInvoker', 'Logger'])
class GuildMemberAddLisener extends WebhookEventListener {
    constructor(hookManagementService, webhookInvoker, logger) {
        super('guildMemberAdd', hookManagementService, webhookInvoker, logger);
    }

    createPayload(guildId, [guildMember]) {
        return PayloadBuilder.createUserJoinPayload(guildId, guildMember);
    }
}

export default GuildMemberAddLisener;