import MessageUpdateListener from '../src/listeners/messageUpdateListener';
import Webhook from '../src/application/models/webHook';
import PayloadBuilder from '../src/application/PayloadBuilder';

const hookManagementServiceMock = jest.genMockFromModule('../src/application/services/hookManagementService').default;
const webhookInvokerMock = jest.genMockFromModule('../src/application/webhookInvoker').default;
const logger = jest.genMockFromModule('winston');

const hookManagementService = new hookManagementServiceMock();
const webhookInvoker = new webhookInvokerMock();
const expectedEventName = 'messageUpdate';
const guildId = 1;

const oldEventMessage = {
    author: {
        id: 2
    },
    guild: {
        id: guildId
    },
    channel: {}
};

const newEventMessage = {
    author: {
        id: 2
    },
    guild: {
        id: guildId
    },
    channel: {}
};

test('Should set eventName to messageUpdate.', () => {
    const messageUpdateListener = new MessageUpdateListener(hookManagementService, webhookInvoker, logger)

    expect(messageUpdateListener.eventName).toBe(expectedEventName);
});

test('Should create messageUpdate payload', async () => {
    const expectedPayload = PayloadBuilder.createMessageUpdatePayload(guildId, oldEventMessage, newEventMessage);
    const messageUpdateListener = new MessageUpdateListener(hookManagementService, webhookInvoker, logger);
    const payload = messageUpdateListener.createPayload(guildId, [oldEventMessage, newEventMessage]);

    expect(payload).toEqual(expectedPayload);
})

test('Only webhooks registered for the messageUpdate event are called', async () => {
    const expectedPayload = PayloadBuilder.createMessageUpdatePayload(guildId, oldEventMessage, newEventMessage);
    const messageUpdateListener = new MessageUpdateListener(hookManagementService, webhookInvoker, logger);
    const webhooks = {
        'messageUpdate': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent.mockImplementation((guildId, event) => webhooks[event]);

    await messageUpdateListener.exec(oldEventMessage, newEventMessage);

    expect(hookManagementService.getHooksForEvent).toHaveBeenCalledWith(guildId, messageUpdateListener.eventName);
    expect(webhookInvoker.sendPayload).toHaveBeenCalledWith(webhooks[messageUpdateListener.eventName], expectedPayload);
});