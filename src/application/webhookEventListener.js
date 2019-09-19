import { Listener } from 'discord-akairo';

class WebhookEventListener extends Listener {
    constructor(eventName, hookManagementService, webhookInvoker, logger) {
        super(eventName, {
            emitter: 'client',
            eventName: eventName
        });

        this.hookManagementService = hookManagementService;
        this.webhookInvoker = webhookInvoker;
        this.logger = logger;
    }

    createPayload(guildId, eventArguments) {
        throw new Error('Please supply an implementation of the createPayload function.');
    }

    async exec(...eventArguments) {
        try {
            let guildId = eventArguments[0].guild.id;
            let payload = this.createPayload(guildId, eventArguments);
            let webhooks = await this.hookManagementService.getHooksForEvent(guildId, this.eventName);
    
            await this.webhookInvoker.sendPayload(webhooks, payload);
        } catch(error) {
            this.logger.error(error.toString());
        }
    }    
}

export default WebhookEventListener;