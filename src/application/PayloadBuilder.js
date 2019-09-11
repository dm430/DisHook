class PayloadBuilder {
    static createMessagePayload(guildId, message){
        let messagePayload = {
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

        return messagePayload;
    }
}

export default PayloadBuilder;