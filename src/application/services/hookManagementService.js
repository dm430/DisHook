import WebHook from "../models/webHook";
import Guild from "../models/Guild";
import { Injectable } from 'container-ioc';

@Injectable()
class HookManagementService {
    constructor() {
        this.guildHooks = new Map();
    }

    getHooks(guildId) {
        console.log(this.guildHooks);
        console.log(guildId);

        let hooks = new Array();

        if (this.guildHooks.has(guildId)) {
            console.log('we made it dad');

            let guild = this.guildHooks.get(guildId);
            hooks = Array.from(guild.webHooks.values());
        }

        return hooks;
    }

    createHook(guildId, hookName, callbackEndpoint) {
        let guild = new Guild(guildId);

        if (this.guildHooks.has(guildId)) {
            guild = this.guildHooks.get(guildId);

            if (guild.webHooks.has(hookName)) {
                throw new Error("The specified webhook already exists.");
            }
        } else {
            this.guildHooks.set(guildId, guild);
        }

        let hook = new WebHook(hookName, callbackEndpoint);
        guild.webHooks.set(hookName, hook);

        console.log(this.guildHooks);
    }
}

export default HookManagementService;


            
