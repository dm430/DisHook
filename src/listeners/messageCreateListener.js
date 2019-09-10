import { Listener } from 'discord-akairo';
import { Injectable } from 'container-ioc';
import axios from 'axios';

@Injectable(['HookManagementService'])
class MessageCreateListener extends Listener {
    constructor(hookManagementService) {
        super('message', {
            emitter: 'client',
            eventName: 'message'
        });

        this.hookManagementService = hookManagementService;
    }

    async exec(message) {
        // TODO: ignore messages the come from this bot.
        let guildId = message.guild.id;
        let hooks = this.hookManagementService.getHooksForEvent(guildId, 'message');
        let results = new Array();

        hooks.forEach(hook => {
            let payload = {
                guildId: guildId,
                event: 'message',
                payload: {
                    message: {
                        id: message.id,
                        type: message.type,
                        content: message.content,
                        pinned: message.pinned,
                        tts: message.tts,
                        nonce: message.nonce,
                        system: message.system,
                        embeds: message.embeds,
                        attachments: message.attachments,
                        createdTimestamp: message.createdTimestamp,
                        editedTimestamp: message.editedTimestamp,
                        reactions: message.reactions,
                        author: {
                            id: message.author.id,
                            username: message.author.username,
                            discriminator: message.author.discriminator,
                            avatar: message.author.avatar,
                            bot: message.author.bot,
                            lastMessageId: message.author.lastMessageID,
                            verified: message.author.verified,
                            email: message.author.email,
                            premium: message.author.premium,
                            mfaEnabled: message.author.mfaEnabled,
                            mobile: message.author.mobile,
                        },
                        channel: {
                            type: message.channel.type,
                            deleted: message.channel.deleted,
                            id: message.channel.id,
                            name: message.channel.name,
                            position: message.channel.position,
                            parentId: message.channel.parentID,
                            permissionOverwrites: message.channel.permissionOverwrites,
                            topic: message.channel.topic,
                            nsfw: message.channel.nsfw,
                            lastMessageID: message.channel.lastMessageID,
                            lastPinTimestamp: message.channel.lastMessageID,
                            rateLimitPerUser: message.channel.rateLimitPerUser,
                        }
                    }
                }
            };

            let result = axios.post(hook.callbackEndpoint, payload);
            results.push(result);
        });

        try {
            await Promise.all(results);
        } catch(error) {
            // TODO: log error.
            console.log(error);
        }
    }
}

export default MessageCreateListener;