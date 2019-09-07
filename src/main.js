import 'dotenv/config';

import { AkairoClient, CommandHandler } from 'discord-akairo';
import { Container, Injectable } from 'container-ioc';

import IocCommandHandler from './handlers/IocCommandHandler';

import PingComamnd  from './commands/pingCommand';
import AddWebHookCommand from './commands/addWebHookCommand';

const container = new Container();

container.register({ token: PingComamnd, useClass: PingComamnd });
container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
container.register({ token: 'test', useValue: 'PingComamnd injected value' });
container.register({ token: 'AkairoClient', useFactory: () => { return client; } });
container.register({ token: 'IocCommandHandler', useFactory: () => { return client.commandHandler; } });

class MyClient extends AkairoClient {
  constructor(container) {
    super();

    this.commandHandler = new IocCommandHandler(this, {
        commandDirectory: './src/commands',
        prefix: '!'
    }, container);
  }
}

const client = new MyClient(container);
client.login(process.env.ACCESS_TOKEN);0
