import 'dotenv/config';

import { Container } from 'container-ioc';
import DisHookClient from './application/DisHookClient';
import { registerCommands, registerServices, registerListeners } from './application/registrations';

const container = new Container();
const client = new DisHookClient(container);

registerCommands(container, process.env);
registerListeners(container, process.env);
registerServices(container, process.env);

container.register({ token: 'AkairoClient', useFactory: () => { return client; } });
container.register({ token: 'IocCommandHandler', useFactory: () => { return client.commandHandler; } });

client.login(process.env.ACCESS_TOKEN);
