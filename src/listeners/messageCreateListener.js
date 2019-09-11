import { Listener } from 'discord-akairo';
import { Injectable } from 'container-ioc';
import PayloadBuilder from '../application/PayloadBuilder';

@Injectable(['AkairoClient', 'HookManagementService', 'WebClient'])
class MessageCreateListener extends Listener {
    constructor(client, hookManagementService, webClient) {
        super('message', {
            emitter: 'client',
            eventName: 'message'
        });

        this.client = client;
        this.hookManagementService = hookManagementService;
        this.webClient = webClient;
    }

    async exec(message) {
        if (message.author.id != this.client.user.id) {
            try {
                let results = new Array();
                let guildId = message.guild.id;
                let webhooks = this.hookManagementService.getHooksForEvent(guildId, this.eventName);

                webhooks.forEach(webhook => {
                    let payload = PayloadBuilder.createMessagePayload(guildId, message);
                    let result = this.webClient.post(webhook.callbackEndpoint, payload);
                    results.push(result);
                });
    
                await Promise.all(results);
            } catch(error) {
                // TODO: log error.
                console.log(error);
            }
        }
    }
}

export default MessageCreateListener;