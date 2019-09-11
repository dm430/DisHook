import { LifeTime } from 'container-ioc';

import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';
import ListWebHooksCommand from '../commands/listWebHooksCommand';
import LinkWebHookToEventCommand from '../commands/linkWebHookToEventCommand';

import MessageCreateListener from '../listeners/messageCreateListener';

import axios from 'axios';
import winston from 'winston';
import HookManagementService from './services/hookManagementService';

export function registerCommands(container) {
    container.register({ token: PingComamnd, useClass: PingComamnd });
    container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
    container.register({ token: ListWebHooksCommand, useClass: ListWebHooksCommand });
    container.register({ token: LinkWebHookToEventCommand, useClass: LinkWebHookToEventCommand });
}

export function registerListeners(container) {
    container.register({ token: MessageCreateListener, useClass: MessageCreateListener });
}

export function registerServices(container) {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'application.log' })
        ]
    });

    container.register({ token: 'Logger', useFactory: () => { return logger; } });
    container.register({ token: 'WebClient', useFactory: () => { return axios; } });
    container.register({ token: 'HookManagementService', useClass: HookManagementService, lifeTime: LifeTime.Persistent });
}