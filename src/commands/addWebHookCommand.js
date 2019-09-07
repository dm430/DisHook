import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable()
class AddWebHookCommand extends Command {
    constructor() {
        super('add-hook', {
           aliases: ['add-hook'],
           args: [
               {
                   id: 'hookName',
                   type: 'string'
               }
           ]
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

export default AddWebHookCommand;