import { Injectable } from 'container-ioc';
import WebhookEventListener from '../application/webhookEventListener';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['HookManagementService', 'WebhookInvoker', 'Logger'])
class GuildMemberRemoveLisener extends WebhookEventListener {
    constructor(hookManagementService, webhookInvoker, logger) {
        super('guildMemberRemove', hookManagementService, webhookInvoker, logger);
    }

    createPayload(guildId, [guildMember]) {
        return PayloadBuilder.createUserRemovePayload(guildId, guildMember);
    }
}

export default GuildMemberRemoveLisener;