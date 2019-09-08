
import { AkairoClient } from 'discord-akairo';
import IocCommandHandler from '../handlers/IocCommandHandler';
import IocListenerHandler from '../handlers/IocListenerHandler';

class DisHookClient extends AkairoClient {
  constructor(container) {
    super();

    this.commandHandler = new IocCommandHandler(this, {
      commandDirectory: './src/commands',
      prefix: '!'
    }, container);

    this.listenerHandler = new IocListenerHandler(this, {
      listenerDirectory: './src/listeners'
    }, container);
  }
}

export default DisHookClient;