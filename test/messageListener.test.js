import MessageCreateListener from '../src/listeners/messageCreateListener';
import Webhook from '../src/application/models/webHook';
import PayloadBuilder from '../src/application/PayloadBuilder';

const hookManagementServiceMock = jest.genMockFromModule('../src/application/services/hookManagementService').default;
const webhookInvokerMock = jest.genMockFromModule('../src/application/webhookInvoker').default;
const logger = jest.genMockFromModule('winston');

const hookManagementService = new hookManagementServiceMock();
const webhookInvoker = new webhookInvokerMock();
const expectedEventName = 'message';
const guildId = 1;
const disHookClient = { 
    user: {
        id: 1 
    } 
}

test('Should set eventName to message.', () => {
    const messageListener = new MessageCreateListener(disHookClient, hookManagementService, webhookInvoker, logger)

    expect(messageListener.eventName).toBe(expectedEventName);
});

test('Should create message payload', async () => {
    const eventMessage = {
        author: {
            id: 2
        },
        guild: {
            id: guildId
        },
        channel: {}
    };

    const expectedPayload = PayloadBuilder.createMessagePayload(guildId, eventMessage);
    const messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webhookInvoker, logger);
    const payload = messageCreateListener.createPayload(guildId, [eventMessage]);

    expect(payload).toEqual(expectedPayload);
})

test('Only webhooks registered for the message event are called', async () => {

    const eventMessage = {
        author: {
            id: 2
        },
        guild: {
            id: guildId
        },
        channel: {}
    };

    const payload = PayloadBuilder.createMessagePayload(guildId, eventMessage);
    const messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webhookInvoker, logger);
    const webhooks = {
        'message': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent.mockImplementation((guildId, event) => webhooks[event]);

    await messageCreateListener.exec(eventMessage);

    expect(hookManagementService.getHooksForEvent).toHaveBeenCalledWith(guildId, messageCreateListener.eventName);
    expect(webhookInvoker.sendPayload).toHaveBeenCalledWith(webhooks[messageCreateListener.eventName], payload);
});

test('Should not invoke webhooks when message originates from bot.', async () => {
    const eventMessage = {
        author: {
            id: disHookClient.user.id
        },
        guild: {
            id: guildId
        },
        channel: {}
    };

    const messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webhookInvoker, logger);

    await messageCreateListener.exec(eventMessage);

    expect(hookManagementService.getHooksForEvent).toHaveBeenCalledTimes(0);
    expect(webhookInvoker.sendPayload).toHaveBeenCalledTimes(0);
});
