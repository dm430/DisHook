import 'dotenv/config';

import { Container } from 'container-ioc';
import DisHookClient from './application/DisHookClient';
import { registerCommands, registerServices, registerListeners } from './application/registrations';

const container = new Container();
const client = new DisHookClient(container);

registerCommands(container);
registerListeners(container);
registerServices(container);

container.register({ token: 'AkairoClient', useFactory: () => { return client; } });
container.register({ token: 'IocCommandHandler', useFactory: () => { return client.commandHandler; } });

client.login(process.env.ACCESS_TOKEN);
