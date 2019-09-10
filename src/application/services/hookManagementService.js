import WebHook from "../models/webHook";
import Guild from "../models/Guild";
import EventHook from '../models/EventHook';
import { Injectable } from 'container-ioc';

@Injectable()
class HookManagementService {
    constructor() {
        this.guildHooks = new Map();
    }

    getHooks(guildId) {
        let hooks = new Array();

        if (this.guildHooks.has(guildId)) {
            let guild = this.guildHooks.get(guildId);
            hooks = Array.from(guild.webHooks.values());
        }
        
        return hooks;
    }

    getHooksForEvent(guildId, event) {
        let hooks = new Array();

        if (this.guildHooks.has(guildId)) {
            let guild = this.guildHooks.get(guildId);

            if (guild.eventsHooks.has(event)) {
                let eventHook = guild.eventsHooks.get(event);
                hooks = eventHook.webHooks;
            }
        }

        return hooks;
    }

    linkHook(guildId, hookName, event) {
        if (this.guildHooks.has(guildId)) {
            let guild = this.guildHooks.get(guildId);

            if (guild.webHooks.has(hookName)) {
                let hook = guild.webHooks.get(hookName);
                let eventHook = new EventHook(event);

                if (guild.eventsHooks.has(event)) {
                    eventHook = guild.eventsHooks.get(event);
                    eventHook.webHooks.push(hook);
                } else {
                    eventHook.webHooks.push(hook);
                    guild.eventsHooks.set(event, eventHook);
                }
            } else {
                throw new Error(`Could not locate a hook with the name ${hookName}.`)
            }
        }
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
    }
}

export default HookManagementService;


            
