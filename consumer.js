const amqp = require('amqplib');

const consumeMessage = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';

        await channel.assertQueue(queue, {durable: false})

        console.log('Waiting for messages. To exit press CTRL+C');

        channel.consume(queue, (msg) => {
            const message = msg.content.toString();
            console.log(`Received: ${message}`);
        }, {noAck: true})
    }catch (err) {
        console.error('Error in produceMessage:', error);
    }
}

consumeMessage();