import 'dotenv/config';

import { LifeTime } from 'container-ioc';

import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';
import ListWebHooksCommand from '../commands/listWebHooksCommand';
import LinkWebHookToEventCommand from '../commands/linkWebHookToEventCommand';

import MessageCreateListener from '../listeners/messageCreateListener';

import axios from 'axios';
import winston from 'winston';
import knex from 'knex';
import WebhookRepository from './repositories/webhookRepository';
import HookManagementService from './services/hookManagementService';

export function registerCommands(container, environment) {
    container.register({ token: PingComamnd, useClass: PingComamnd });
    container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
    container.register({ token: ListWebHooksCommand, useClass: ListWebHooksCommand });
    container.register({ token: LinkWebHookToEventCommand, useClass: LinkWebHookToEventCommand });
}

export function registerListeners(container, environment) {
    container.register({ token: MessageCreateListener, useClass: MessageCreateListener });
}

export function registerServices(container, environment) {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: environment.LOG_PATH })
        ]
    });

    const queryBuilder = knex({
        client: 'sqlite3',
        connection: {
            filename: environment.SQL_CONNECTION
        },
        pool: {
            afterCreate: (connection, completeCallback) => {
                connection.run('PRAGMA foreign_keys = ON', completeCallback);
            }
        }
    });

    container.register({ token: 'QueryBuilder', useFactory: () => { return queryBuilder; } });
    container.register({ token: 'Logger', useFactory: () => { return logger; } });
    container.register({ token: 'WebClient', useFactory: () => { return axios; } });
    container.register({ token: 'WebhookRepository', useClass: WebhookRepository });
    container.register({ token: 'HookManagementService', useClass: HookManagementService, lifeTime: LifeTime.Persistent });
}