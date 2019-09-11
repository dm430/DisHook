import MessageCreateListener from '../src/listeners/messageCreateListener';
import Webhook from '../src/application/models/webHook';

test('Only webhooks registered for the message event are called', async () => {
    const disHookClient = { user: { id: 1 } }
    const hookManagementService = jest.genMockFromModule('../src/application/services/hookManagementService').default;
    const webClient = jest.genMockFromModule('axios').default;
    const messageCreateListener = new MessageCreateListener(disHookClient, hookManagementService, webClient);

    const webhooks = {
        'message': [ new Webhook('testhook1', 'http://test.hook'), new Webhook('testhook1', 'http://test.hook') ],
        'otherevent': []
    };

    hookManagementService.getHooksForEvent = jest.fn((guildId, event) => webhooks[event]);

    await messageCreateListener.exec({
        author: {
            author: 2
        },
        guild: {
            id: 1
        },
        channel: {}
    });

    expect(webClient.post.mock.calls.length).toBe(webhooks['message'].length);
});
