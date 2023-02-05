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
import { Utils } from '@server/src/common/utils/utils'
import { config } from '@server/src/config'
import { IApiRes } from '@server/src/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/src/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/src/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/src/modules/modules'
import * as path from 'path'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from '../infrastructure/attachment.request'
import { AttachmentUploadResponse } from '../infrastructure/attachment.response'
import { AttachmentService } from '../infrastructure/attachment.service'

const THIS_MODULE = Modules.Attachment

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(LoggedInGuard)
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':filePath')
  findUploadedAttachment(@Param('filePath') file: string, @Res() res: any) {
    return res.sendFile(file, {
      root: path.resolve('./') + config.assets.storage,
    })
  }

  @Post()
  @UseInterceptors(FileInterceptor(THIS_MODULE, Utils.multerOptions()))
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: AttachmentUploadRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const fileUrl = config.server.host + '/' + THIS_MODULE + '/' + file.filename

    const attachment = await this.attachmentService.upload(fileUrl, req)
    return ApiRes.all(AttachmentUploadResponse.fromEntity(attachment))
  }

  @Get()
  async findAttachment(
    @Query() attachmentFindRequest: AttachmentFindRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const attachment = await this.attachmentService.findOne(
      attachmentFindRequest,
    )

    return ApiRes.all(AttachmentUploadResponse.fromEntity(attachment))
  }
}
