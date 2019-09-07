import { AkairoClient } from 'discord-akairo';

const client = new AkairoClient({
    prefix: '!',
    commandDirectory: './src/commands'
}, {
    disableEveryone: true
});

client.login('NjE5NzYwNjkzNzMzNzUyODQz.XXNBFQ.W2IZLwjA6zFaKiQvvjHNOq9QOrs');