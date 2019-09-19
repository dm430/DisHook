import MessageDeleteListener from '../src/listeners/messageDeleteListiner';
import Webhook from '../src/application/models/webHook';
import PayloadBuilder from '../src/application/PayloadBuilder';

const hookManagementServiceMock = jest.genMockFromModule('../src/application/services/hookManagementService').default;
const webhookInvokerMock = jest.genMockFromModule('../src/application/webhookInvoker').default;
const logger = jest.genMockFromModule('winston');

const hookManagementService = new hookManagementServiceMock();
const webhookInvoker = new webhookInvokerMock();
const expectedEventName = 'messageDelete';
const guildId = 1;
const eventMessage = {
    author: {
        id: 2
    },
    guild: {
        id: guildId
    },
    channel: {}
};

test('Should set eventName to messageDelete.', () => {
    const messageDeleteListener = new MessageDeleteListener(hookManagementService, webhookInvoker, logger)

    expect(messageDeleteListener.eventName).toBe(expectedEventName);
});

test('Should create messageDelete payload', async () => {
    const expectedPayload = PayloadBuilder.createMessageDeletePayload(guildId, eventMessage);
    const messageDeleteListener = new MessageDeleteListener(hookManagementService, webhookInvoker, logger);
    const payload = messageDeleteListener.createPayload(guildId, [eventMessage]);

    expect(payload).toEqual(expectedPayload);
})

test('Only webhooks registered for the messageDelete event are called', async () => {
    const payload = PayloadBuilder.createMessageDeletePayload(guildId, eventMessage);
    const messageDeleteListener = new MessageDeleteListener(hookManagementService, webhookInvoker, logger);
    const webhooks = {
        'messageDelete': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent.mockImplementation((guildId, event) => webhooks[event]);

    await messageDeleteListener.exec(eventMessage);

    expect(hookManagementService.getHooksForEvent).toHaveBeenCalledWith(guildId, messageDeleteListener.eventName);
    expect(webhookInvoker.sendPayload).toHaveBeenCalledWith(webhooks[messageDeleteListener.eventName], payload);
});