import { CommandHandler } from 'discord-akairo';
import IocModuleLoader from '../application/IocModuleLoader';

class IocCommandHandler extends CommandHandler {
    constructor(client, options = {}, iocContainer) {
        super(client, options);
        this.iocContainer = iocContainer;
        this.iocModuleLoader = new IocModuleLoader(this);
    }

    load(thing, isReload = false) {
        return this.iocModuleLoader.load(thing, isReload);
    }
}

export default IocCommandHandler;