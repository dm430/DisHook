import PingComamnd  from '../commands/pingCommand';
import AddWebHookCommand from '../commands/addWebHookCommand';

export default function(container) {
    container.register({ token: PingComamnd, useClass: PingComamnd });
    container.register({ token: AddWebHookCommand, useClass: AddWebHookCommand });
}