import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['HookManagementService'])
class LinkWebHookToEventCommand extends Command {
    constructor(hookManagementService) {
        super('link-hook', {
           aliases: ['link-hook'],
           category: 'hook management',
           split: 'quoted',
           args: [
               {
                   id: 'event',
                   type: ['message', 'messageDelete', 'messageUpdate', 'guildMemberAdd', 'guildMemberRemove'],
                   prompt: {
                    start: 'Please supply the event type you wish to link.'
                   }
               },
               {
                   id: 'hookName',
                   type: 'string',
                   prompt: {
                    start: 'Please name of the hook you wish to link.'
                   }
               }
           ],
           userPermissions: ['MANAGE_WEBHOOKS']
        });

        this.hookManagementService = hookManagementService;
    }

    async exec(message, args) {
        try {
            let guildId = message.guild.id;
            await this.hookManagementService.linkHook(guildId, args.hookName, args.event);
        } catch(error) {
            return message.reply(`Failed to link webhook: ${error}.`);
        }

        return message.reply(`The webhook ${args.hookName} was successfully linked to the event ${args.event}`);
    }
}

export default LinkWebHookToEventCommand;