const amqp = require('amqplib');

const produceMessage = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';
        const message = 'Hello RebbitMQ'

        await channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Send ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit(0)
        }, 500)
    } catch (error) {
        console.error('Error in produceMessage:', error);
    }
}

produceMessage()