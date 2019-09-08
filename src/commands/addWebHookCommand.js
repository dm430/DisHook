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
           ]
        });

        this.hookManagementService = hookManagementService;
    }

    exec(message, args) {
        try {
            let guildId = message.guild.id;
            this.hookManagementService.createHook(guildId, args.hookName, args.endpoint);
        } catch(error) {
            return message.reply(`Failed to create web hook: ${error}.`);
        }
        
        return message.reply(`Web hook created successfully.`);
    }
}

export default AddWebHookCommand;