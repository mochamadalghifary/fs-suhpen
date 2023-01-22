import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { config } from '../../../config'
import { AuthModule } from '../../users/auth/auth.module'
import { AttachmentController } from './controllers/attachment.controller'
import { AppAttachment } from './entities/attachment.entity'
import { AttachmentService } from './services/attachment.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppAttachment]),
    AuthModule,
    MulterModule.register({
      dest: path.resolve('./') + '/dist/' + config.assets.storage,
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
