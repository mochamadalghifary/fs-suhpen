import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '@server/src/config'
import * as path from 'path'
import { AuthModule } from '../../iam/auth/auth.module'
import { AttachmentController } from './controllers/attachment.controller'
import { AppAttachment } from './entities/attachment.entity'
import { AttachmentService } from './services/attachment.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppAttachment]),
    AuthModule,
    MulterModule.register({
      dest: path.resolve('./') + config.assets.storage,
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
