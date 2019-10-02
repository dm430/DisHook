
import { AkairoClient } from 'discord-akairo';
import IocCommandHandler from '../handlers/IocCommandHandler';
import IocListenerHandler from '../handlers/IocListenerHandler';

class DisHookClient extends AkairoClient {
  constructor(container) {
    super();
    console.log(__dirname)
    
    this.commandHandler = new IocCommandHandler(this, {
      commandDirectory: `${__dirname}/../commands`,
      prefix: '!'
    }, container);

    this.listenerHandler = new IocListenerHandler(this, {
      listenerDirectory: `${__dirname}/../listeners`
    }, container);
  }
}

export default DisHookClient;