import 'dotenv/config';

import { Container } from 'container-ioc';
import DisHookClient from './application/DisHookClient';
import { registerCommands, registerServices } from './application/registrations';

const container = new Container();
const client = new DisHookClient(container);

registerCommands(container);
registerServices(container);

container.register({ token: 'test', useValue: 'PingComamnd injected value' });
container.register({ token: 'AkairoClient', useFactory: () => { return client; } });
container.register({ token: 'IocCommandHandler', useFactory: () => { return client.commandHandler; } });

client.login(process.env.ACCESS_TOKEN);
