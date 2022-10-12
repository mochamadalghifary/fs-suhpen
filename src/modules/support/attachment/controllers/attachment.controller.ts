import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import * as path from 'path'
import { fileFilter, Utils } from 'src/common/utils/util'
import { IApiResponse } from 'src/infrastructure/interfaces/responses.interface'
import { Modules } from 'src/modules/modules'
import { LoggedInGuard } from 'src/modules/users/auth/guards/logged-in.guard'
import { config } from '../../../../config'
import { AttachmentUploadRequest } from '../requests/attachment-upload.request'
import { FindAttachmentRequest } from '../requests/find-attachment.request'
import { AttachmentUploadResponse } from '../responses/attachment-upload.response'
import { AttachmentService } from '../services/attachment.service'

@Controller(Modules.Attachment)
@ApiTags(Modules.Attachment)
@UseGuards(LoggedInGuard)
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':filePath')
  findUploadedAttachment(@Param('filePath') file: string, @Res() res: any) {
    return res.sendFile(file, {
      root: path.resolve('./') + '/dist/' + config.assets.public,
    })
  }

  @Post()
  @UseInterceptors(
    FileInterceptor(Modules.Attachment, { fileFilter: fileFilter }),
  )
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: AttachmentUploadRequest,
  ): Promise<IApiResponse<AttachmentUploadResponse>> {
    const fileUrl = await Utils.moveFile(
      file.path,
      '/' + Date.now() + '-' + file.originalname,
    )

    const attachment = await this.attachmentService.upload(fileUrl, req)

    return {
      message: 'Success upload file',
      data: AttachmentUploadResponse.fromEntity(attachment),
    }
  }

  @Get()
  async findAttachment(
    @Query() findAttachmentRequest: FindAttachmentRequest,
  ): Promise<IApiResponse<AttachmentUploadResponse>> {
    const attachment = await this.attachmentService.findOne(
      findAttachmentRequest,
    )

    return {
      message: 'Success find file',
      data: AttachmentUploadResponse.fromEntity(attachment),
    }
  }
}
