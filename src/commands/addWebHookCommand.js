import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['HookManagementService'])
class AddWebHookCommand extends Command {
    constructor(hookManagementService) {
        super('add-hook', {
           aliases: ['add-hook'],
           category: 'hook management',
           split: 'quoted',
           args: [
               {
                   id: 'hookName',
                   type: 'string'
               },
               {
                   id: 'endpoint',
                   type: 'string'
               }
           ],
           userPermissions: ['MANAGE_WEBHOOKS']
        });

        this.hookManagementService = hookManagementService;
    }

    exec(message, args) {
        try {
            let guildId = message.guild.id;
            this.hookManagementService.createHook(guildId, args.hookName, args.endpoint);
        } catch(error) {
            return message.reply(`Failed to create webhook: ${error}.`);
        }
        
        return message.reply(`Webhook created successfully.`);
    }
}

export default AddWebHookCommand;