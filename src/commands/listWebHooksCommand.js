import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['HookManagementService'])
class ListWebHooksCommand extends Command {
    constructor(hookManagementService) {
        super('list-hooks', {
           aliases: ['list-hooks'],
           category: 'hook management',
           userPermissions: ['MANAGE_WEBHOOKS']
        });

        this.hookManagementService = hookManagementService;
    }

    _createFormattedList(webHooks) {
        let formattedList = 'Available webhooks\n\n';
        
        webHooks.forEach(webHook => {
            formattedList += `Name: ${webHook.name}\n`;
            formattedList += `Callback: ${webHook.callbackEndpoint}\n\n`;
        });

        return formattedList;
    }

    exec(message) {
        let guildId = message.guild.id;
        let webHooks = this.hookManagementService.getHooks(guildId);
        
        console.log(webHooks);

        if (webHooks.length == 0) {
            return message.reply(`No webhooks exist in his guild. Run the add-hook command to create one.`);
        }

        let webHookList = this._createFormattedList(webHooks);
        return message.reply(webHookList);
    }
}

export default ListWebHooksCommand;