import MessageCreateListener from '../src/listeners/messageCreateListener';
import Webhook from '../src/application/models/webHook';

test('Only webhooks registered for the message event are called', async () => {
    let disHookClient = { user: { id: 1 } }
    let hookManagementService = jest.genMockFromModule('../src/application/services/hookManagementService').default;
    let webClient = jest.genMockFromModule('axios').default;
    let logger = jest.genMockFromModule('winston');
    let messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webClient, logger);

    let webhooks = {
        'message': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent = jest.fn((guildId, event) => webhooks[event]);
    await messageCreateListener.exec({
        author: {
            id: 2
        },
        guild: {
            id: 1
        },
        channel: {}
    });

    expect(webClient.post.mock.calls.length).toBe(webhooks['message'].length);
});

test('No webhooks are called when the message originates from the bot client', async () => {
    let disHookClient = { user: { id: 1 } }
    let hookManagementService = jest.genMockFromModule('../src/application/services/hookManagementService').default;
    let webClient = jest.genMockFromModule('axios').default;
    let logger = jest.genMockFromModule('winston');
    let messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webClient, logger);

    let webhooks = {
        'message': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent = jest.fn((guildId, event) => webhooks[event]);
    await messageCreateListener.exec({
        author: {
            id: 1
        },
        guild: {
            id: 1
        },
        channel: {}
    });

    expect(webClient.post.mock.calls.length).toBe(0);
});

test('Errors are logged', async () => {
    let disHookClient = { user: { id: 1 } }
    let hookManagementService = jest.genMockFromModule('../src/application/services/hookManagementService').default;
    let webClient = jest.genMockFromModule('axios').default;
    let logger = jest.genMockFromModule('winston');
    let messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webClient, logger);

    webClient.post = jest.fn((guildId, event) =>  { throw new Error('error.'); });
    await messageCreateListener.exec({
        author: {
            id: 2
        },
        guild: {
            id: 1
        },
        channel: {}
    });

    expect(logger.error.mock.calls.length).toBe(1);
});
