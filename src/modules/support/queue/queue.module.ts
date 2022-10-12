import { Module } from '@nestjs/common'
import { QueueService } from './services/queue.service'

@Module({
  imports: [],
  controllers: [],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
