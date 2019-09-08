import { Constants } from 'discord-akairo';

class IocModuleLoader {
    constructor(handlerContext) {
        this.handlerContext = handlerContext;
    }

    _findExport(moduleExport) {
        if (!moduleExport) { 
            return null; 
        }

        if (moduleExport instanceof this.handlerContext.classToHandle || moduleExport instanceof this.handlerContext.classToHandle.constructor) { 
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

        if (module instanceof this.handlerContext.classToHandle.constructor) {
            console.log(module.name);
            module = this.handlerContext.iocContainer.resolve(module);
        } else if (!instanceDeprecation) {
            instanceDeprecation = true;
            console.error('Akairo: Exports of module instances are deprecated. Consider exporting module classes.');
        }

        if (!(module instanceof this.handlerContext.classToHandle)) {
            if (!isObject) { 
                delete require.cache[require.resolve(thing)];
            }

            return undefined;
        }

        if (this.handlerContext.modules.has(module.id)) {
            throw new Error(`${this.handlerContext.classToHandle.name} ${module.id} already loaded.`);
        }

        this.handlerContext._apply(module, isObject ? null : thing);

        if (!isReload) {
            this.handlerContext.emit(Constants.AkairoHandlerEvents.LOAD, module);
        }

        return module;
    }
}

export default IocModuleLoader;