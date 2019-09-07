import { CommandHandler, Constants } from 'discord-akairo';

class IocCommandHandler extends CommandHandler {
    constructor(client, options = {}, iocContainer) {
        super(client, options);
        this.iocContainer = iocContainer;
    }

    _findExport(moduleExport) {
        if (!moduleExport) { 
            return null; 
        }

        if (moduleExport instanceof this.classToHandle || moduleExport instanceof this.classToHandle.constructor) { 
            return moduleExport;
        }

        return this._findExport(moduleExport.default);
    };

    load(thing, isReload = false) {
        const isObject = typeof thing === 'object';

        if (!isObject && !/\.(js|json|ts)$/.test(thing)) {
            return undefined;
        } 

        let module = isObject ? thing : this._findExport(require(thing));

        if (module instanceof this.classToHandle.constructor) {
            console.log(module.name);
            module = this.iocContainer.resolve(module);
        } else if (!instanceDeprecation) {
            instanceDeprecation = true;
            console.error('Akairo: Exports of module instances are deprecated. Consider exporting module classes.');
        }

        if (!(module instanceof this.classToHandle)) {
            if (!isObject) { 
                delete require.cache[require.resolve(thing)];
            }

            return undefined;
        }

        if (this.modules.has(module.id)) {
            throw new Error(`${this.classToHandle.name} ${module.id} already loaded.`);
        }

        this._apply(module, isObject ? null : thing);

        if (!isReload) {
            this.emit(Constants.AkairoHandlerEvents.LOAD, module);
        }

        return module;
    }
}

export default IocCommandHandler;