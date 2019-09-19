import { Injectable } from 'container-ioc';

@Injectable(['WebClient'])
class WebhookInvoker {
    constructor(webClient) {
        this.webClient = webClient;
    }

    async sendPayload(webhooks, payload) {
        let requests = new Array();
        
        webhooks.forEach(webhook => {
            let result = this.webClient.post(webhook.callbackEndpoint, payload);
            requests.push(result);
        });

       return Promise.allSettled(requests);
    }
}

export default WebhookInvoker;