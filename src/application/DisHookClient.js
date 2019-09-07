
import { AkairoClient } from 'discord-akairo';
import IocCommandHandler from '../handlers/IocCommandHandler';

class DisHookClient extends AkairoClient {
    constructor(container) {
      super();
  
      this.commandHandler = new IocCommandHandler(this, {
          commandDirectory: './src/commands',
          prefix: '!'
      }, container);
    }
  }

  export default DisHookClient;