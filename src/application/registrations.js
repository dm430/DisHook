import { LifeTime } from 'container-ioc';

import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';
import ListWebHooksCommand from '../commands/listWebHooksCommand';

import HookManagementService from './services/hookManagementService';

export function registerCommands(container) {
    container.register({ token: PingComamnd, useClass: PingComamnd });
    container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
    container.register({ token: ListWebHooksCommand, useClass: ListWebHooksCommand });
}

export function registerServices(container) {
    container.register({ token: 'HookManagementService', useClass: HookManagementService, lifeTime: LifeTime.Persistent });
}