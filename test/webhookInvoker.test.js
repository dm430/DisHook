import WebhookInvoker from '../src/application/webhookInvoker';
import Webhook from '../src/application/models/webHook';

test('Should send the payload to every webhook.', async () => {
    const webClient = jest.genMockFromModule('axios').default;
    const webhookInvoker = new WebhookInvoker(webClient);
    const webhooks = [ new Webhook('1', 'http://test.hook'), new Webhook('2', 'http://test.hook') ];

    await webhookInvoker.sendPayload(webhooks, { value: 'This is a test payload' });

    expect(webClient.post).toHaveBeenCalledTimes(webhooks.length);
});

test('Should invoke all webhooks even if a request fails.', async () => {
    const successfulUrl = 'http://test.hook';

    const webClient = jest.genMockFromModule('axios').default;
    const webhookInvoker = new WebhookInvoker(webClient);
    const webhooks = [ new Webhook('1', successfulUrl), new Webhook('2', 'http://test.bad'), new Webhook('3', 'http://test.bad'), new Webhook('4', successfulUrl) ];

    webClient.post.mockImplementation((url) => { 
            if (url == successfulUrl) {
                return Promise.resolve({
                    data: {},
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config: {},
                    request: {}
                });
            }

            return Promise.reject({
                data: {},
                status: 400,
                statusText: 'NOT FOUND',
                headers: {},
                config: {},
                request: {}
            });
        });

    const results = await webhookInvoker.sendPayload(webhooks, { value: 'This is a test payload' });

    expect(webClient.post).toHaveBeenCalledTimes(webhooks.length);
    expect(results.length).toBe(webhooks.length);
});