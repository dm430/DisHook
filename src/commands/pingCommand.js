import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['AkairoClient', 'IocCommandHandler'])
class PingCommand extends Command {
    constructor(client, handler) {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

export default PingCommand;