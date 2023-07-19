

const exchangeName = 'ex.logs'

 const sendMsg = async () =>{
    const connection = await amqplib.connect('amqp://guest:Anandhu@1996@localhost')
    const channel = await connection.createChannel()  
    await channel.assertExchange(exchangeName,'fanout',{durable:false})  
    const q = await channel.assertQueue('',{exclusive:true})//quename empty
    console.log(`Waiting for messages in queue : ${q.queue}`)
    channel.bindQueue(q.queue,exchangeName,'')//routing key empty
    channel.consume(q.queue,msg =>{
        if(msg.content) console.log("The message is :",msg.content.toString())
    },{noAck:true})
}
sendMsg()