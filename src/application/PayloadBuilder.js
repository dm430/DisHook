import EventPayload from './models/eventPayload';

class PayloadBuilder {
    static _buildMessage(message) {
        const builtMessage = {
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
        };

        return builtMessage;
    }

    static createMessageDeletePayload(guildId, message){
        const messagePayload = {
            message: this._buildMessage(message)
        };

        return new EventPayload(guildId, 'messageDelete', messagePayload);
    }

    static createMessageUpdatePayload(guildId, oldMessage, message) {
        const messagePayload = {
            message: this._buildMessage(message),
            oldMessage: this._buildMessage(oldMessage)
        };

        return new EventPayload(guildId, 'messageUpdate', messagePayload);
    }

    static createMessagePayload(guildId, message){
        const messagePayload = {
            message: this._buildMessage(message)
        };

        return new EventPayload(guildId, 'message', messagePayload);
    }

    static createUserJoinPayload(guildId, guildMember) {
        const guildMemberPayload = {
            guildMember: {
                user: {
                    id: guildMember.user.id,
                    username: guildMember.user.username,
                    discriminator: guildMember.user.discriminator,
                    avatar: guildMember.user.avatar,
                    bot: guildMember.user.bot
                },
                joinedTimestamp: guildMember.joinedTimestamp
            }
        };

        return new EventPayload(guildId, 'guildMemberAdd', guildMemberPayload);
    }

    static createUserRemovePayload(guildId, guildMember) {
        const guildMemberPayload = {
            guildMember: {
                user: {
                    id: guildMember.user.id,
                    username: guildMember.user.username,
                    discriminator: guildMember.user.discriminator,
                    avatar: guildMember.user.avatar,
                    bot: guildMember.user.bot
                },
                joinedTimestamp: guildMember.joinedTimestamp,
                roles: guildMember._roles,
                serverDeaf: guildMember.serverDeaf,
                serverMute: guildMember.serverMute,
                nickname: guildMember.nickname,
                deleted: guildMember.deleted
            }
        };

        return new EventPayload(guildId, 'guildMemberRemove', guildMemberPayload);
    }
}

export default PayloadBuilder;