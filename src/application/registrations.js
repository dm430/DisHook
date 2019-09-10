import { LifeTime } from 'container-ioc';

import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';
import ListWebHooksCommand from '../commands/listWebHooksCommand';
import LinkWebHookToEventCommand from '../commands/linkWebHookToEventCommand';

import MessageCreateListener from '../listeners/messageCreateListener';

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
    container.register({ token: 'HookManagementService', useClass: HookManagementService, lifeTime: LifeTime.Persistent });
}