import 'dotenv/config';

import { LifeTime } from 'container-ioc';

import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';
import ListWebHooksCommand from '../commands/listWebHooksCommand';
import LinkWebHookToEventCommand from '../commands/linkWebHookToEventCommand';

import MessageCreateListener from '../listeners/messageCreateListener';
import MessageDeleteListener from '../listeners/messageDeleteListiner';
import MessageUpdateListener from '../listeners/messageUpdateListener';
import GuildJoinListener from '../listeners/guildJoinListener';
import GuildMemberAddLisener from '../listeners/guildMemberAddLisener';
import GuildMemberRemoveLisener from '../listeners/guildMemberRemoveListener';

import axios from 'axios';
import winston from 'winston';
import knex from 'knex';
import WebhookInvoker from './webhookInvoker';
import WebhookRepository from './repositories/webhookRepository';
import HookManagementService from './services/hookManagementService';
import GuildRepository from './repositories/guildRepository';
import GuildManagementService from './services/guildManagementService';

export function registerCommands(container, environment) {
    container.register({ token: PingComamnd, useClass: PingComamnd });
    container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
    container.register({ token: ListWebHooksCommand, useClass: ListWebHooksCommand });
    container.register({ token: LinkWebHookToEventCommand, useClass: LinkWebHookToEventCommand });
}

export function registerListeners(container, environment) {
    container.register({ token: MessageCreateListener, useClass: MessageCreateListener });
    container.register({ token: MessageDeleteListener, useClass: MessageDeleteListener });
    container.register({ token: MessageUpdateListener, useClass: MessageUpdateListener });
    container.register({ token: GuildJoinListener, useClass: GuildJoinListener });
    container.register({ token: GuildMemberAddLisener, useClass: GuildMemberAddLisener });
    container.register({ token: GuildMemberRemoveLisener, useClass: GuildMemberRemoveLisener });
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
    container.register({ token: 'WebhookInvoker', useClass: WebhookInvoker });
    container.register({ token: 'WebhookRepository', useClass: WebhookRepository });
    container.register({ token: 'HookManagementService', useClass: HookManagementService, lifeTime: LifeTime.Persistent });
    container.register({ token: 'GuildRepository', useClass: GuildRepository });
    container.register({ token: 'GuildManagementService', useClass: GuildManagementService, lifeTime: LifeTime.Persistent });
}