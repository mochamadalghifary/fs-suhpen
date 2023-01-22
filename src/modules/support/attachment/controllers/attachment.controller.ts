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
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { Utils } from 'src/common/utils/utils';
import { IApiRes } from 'src/infrastructure/interfaces/api-responses.interface';
import { ApiRes } from 'src/infrastructure/interfaces/api.response';
import { Modules } from 'src/modules/modules';
import { LoggedInGuard } from 'src/modules/users/auth/guards/logged-in.guard';
import { config } from '../../../../config';
import { AttachmentUploadRequest } from '../requests/attachment-upload.request';
import { FindAttachmentRequest } from '../requests/find-attachment.request';
import { AttachmentUploadResponse } from '../responses/attachment-upload.response';
import { AttachmentService } from '../services/attachment.service';

const THIS_MODULE = Modules.Attachment

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
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
    FileInterceptor(THIS_MODULE, { fileFilter: Utils.fileFilter }),
  )
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: AttachmentUploadRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const fileUrl = file.path + '/' + Date.now() + '-' + file.originalname
    const attachment = await this.attachmentService.upload(fileUrl, req)

    return ApiRes.all(AttachmentUploadResponse.all(attachment))
  }

  @Get()
  async findAttachment(
    @Query() findAttachmentRequest: FindAttachmentRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const attachment = await this.attachmentService.findOne(
      findAttachmentRequest,
    )

    return ApiRes.all(AttachmentUploadResponse.all(attachment),)
  }
}
