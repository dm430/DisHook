import { Command } from 'discord-akairo';
import { Injectable } from 'container-ioc';

@Injectable(['AkairoClient', 'IocCommandHandler', 'test'])
class PingCommand extends Command {
    constructor(client, handler, test) {
        super('ping', {
           aliases: ['ping'] 
        });

        this.client = client;
        this.handler = handler;
        this.test = test;
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

export default PingCommand;