import Webhook from '../src/application/models/webHook';
import WebhookEventListener from '../src/application/webhookEventListener';
import TestListener from './mocks/testListener';

const hookManagementServiceMock = jest.genMockFromModule('../src/application/services/hookManagementService').default;
const webhookInvokerMock = jest.genMockFromModule('../src/application/webhookInvoker').default;
const logger = jest.genMockFromModule('winston');

const hookManagementService = new hookManagementServiceMock();
const webhookInvoker = new webhookInvokerMock();

test('Should set Listener eventName.', () => {
    const expectedEventName = 'eventNameValueTest';
    const testListener = new WebhookEventListener(expectedEventName, hookManagementService, webhookInvoker, logger);

    expect(testListener.eventName).toBe(expectedEventName);
});

test('Should only invoke webhooks registered to event type.', async () => {
    const payload = { value: 'test event data' };
    const giildId = 1;
    const testListener = new TestListener(hookManagementService, webhookInvoker, logger, payload);

    const webhooks = {
        'test': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent.mockImplementation((guildId, event) => webhooks[event]);

    await testListener.exec({
        guild: {
            id: giildId
        }
    });

    expect(hookManagementService.getHooksForEvent).toHaveBeenCalledWith(giildId, testListener.eventName);
    expect(webhookInvoker.sendPayload).toHaveBeenCalledWith(webhooks[testListener.eventName], payload);
});

test('Should log error.', async () => {
    const payload = { value: 'test event data' };
    const testListener = new TestListener(hookManagementService, webhookInvoker, logger, payload);

    hookManagementService.getHooksForEvent.mockImplementation((guildId, event) =>  { throw new Error('test error.'); });

    await testListener.exec({
        guild: {
            id: 1
        }
    });

    expect(logger.error).toHaveBeenCalled();
});

test('Should log error when implementation for createPayload is not supplied.', async () => {
    const testListener = new WebhookEventListener('test', hookManagementService, webhookInvoker, logger);

    await testListener.exec({
        guild: {
            id: 1
        }
    });

    expect(logger.error).toHaveBeenCalledWith('Error: Please supply an implementation of the createPayload function.');
});