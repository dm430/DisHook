import { Injectable } from 'container-ioc';

@Injectable(['WebClient'])
class WebhookInvoker {
    constructor(webClient) {
        this.webClient = webClient;
    }

    async sendPayload(webhooks, payload) {
        let results = new Array();
        
        webhooks.forEach(webhook => {
            let result = this.webClient.post(webhook.callbackEndpoint, payload);
            results.push(result);
        });

        await Promise.all(results);
    }
}

export default WebhookInvoker;