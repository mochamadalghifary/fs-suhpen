import { Injectable } from '@nestjs/common'
import * as callbackAPI from 'amqplib/callback_api'
import { plainToInstance } from 'class-transformer'
import { config } from 'src/config'
import { MessageContract } from '../contracts/message.contract'

@Injectable()
export class QueueService {
  public async create(
    messageContract: MessageContract,
    delay: number,
    cb: (messageContract: MessageContract) => Promise<void>,
  ): Promise<void> {
    await this.addConsumer(
      config.amqp.conn,
      async (message: callbackAPI.Message) => {
        const messageContractStr = message.content.toString('utf-8')
        const messageContract = plainToInstance(
          MessageContract,
          JSON.parse(messageContractStr),
          {
            enableCircularCheck: true,
          },
        )

        await cb(messageContract)
      },
    )

    await this.publish(config.amqp.conn, messageContract, delay)
  }

  private async addConsumer(
    conn: callbackAPI.Connection,
    cb: (messageContract: callbackAPI.Message) => Promise<void>,
  ): Promise<void> {
    conn.createChannel((err: Error, ch: callbackAPI.Channel) => {
      if (err != null) {
        // eslint-disable-next-line no-console
        console.error(err)
        return
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ch.assertExchange(config.queue.exchange, 'x-delayed-message', {
        durable: true,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        arguments: { 'x-delayed-type': 'direct' },
      })
      ch.assertQueue(config.queue.name, { durable: true })
      ch.bindQueue(
        config.queue.name,
        config.queue.exchange,
        config.queue.binding,
      )

      // eslint-disable-next-line no-console
      console.log('create chann & start consume message')

      ch.consume(
        config.queue.name,
        cb,
        {
          noAck: true,
        },
        (err: Error, ok: callbackAPI.Replies.Consume) => {
          if (err != null) {
            // eslint-disable-next-line no-console
            console.error(err)
          } else if (ok) {
            // eslint-disable-next-line no-console
            console.error('consumed ' + ok.consumerTag)
          }

          // eslint-disable-next-line no-console
          console.error('consumed message')
        },
      )
    })
  }

  private async publish(
    conn: callbackAPI.Connection,
    messageContract: MessageContract,
    delay: number,
  ): Promise<any> {
    conn.createChannel((err: Error, ch: callbackAPI.Channel) => {
      if (err != null) {
        // eslint-disable-next-line no-console
        console.error(err)
        return

      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const headers = { 'x-delay': delay }
      ch.publish(
        config.queue.exchange,
        config.queue.binding,
        Buffer.from(JSON.stringify(messageContract)),
        { headers },
      )
    })
  }
}
