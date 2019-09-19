import WebhookEventListener from '../../src/application/webhookEventListener';

class TestListener extends WebhookEventListener {
    constructor(hookManagementService, webhookInvoker, logger, payload) {
        super('test', hookManagementService, webhookInvoker, logger);
        this.payload = payload;
    }

    createPayload(guildId, [message]) {
        return this.payload;
    }
}

export default TestListener;