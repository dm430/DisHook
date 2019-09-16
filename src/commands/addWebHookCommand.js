import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['HookManagementService'])
class AddWebHookCommand extends Command {
    constructor(hookManagementService) {
        super('add-hook', {
           aliases: ['add-hook'],
           category: 'hook management',
           split: 'sticky',
           args: [
               {
                   id: 'hookName',
                   type: 'string'
               },
               {
                   id: 'endpoint',
                   type: 'string'
               },
               {
                   id: 'event',
                   match: 'prefix',
                   prefix: '-event=',
                   default: undefined
               }
           ],
           userPermissions: ['MANAGE_WEBHOOKS']
        });

        this.hookManagementService = hookManagementService;
    }

    async exec(message, args) {
        let resultMessage = `Webhook created`;

        try {
            let guildId = message.guild.id;
            await this.hookManagementService.createHook(guildId, args.hookName, args.endpoint);

            if (args.event) {
                await this.hookManagementService.linkHook(guildId, args.hookName, args.event);
                resultMessage += ' and linked'
            }

            resultMessage += ' successfully.';
        } catch(error) {
            resultMessage = `Failed to create webhook: ${error}.`;
        }
        
        return message.reply(resultMessage);
    }
}

export default AddWebHookCommand;