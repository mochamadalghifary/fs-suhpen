import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'

export class Exception {
  static unprocessableEntity(message?: string): void {
    throw new UnprocessableEntityException(message)
  }

  static unauthorized(message?: string): void {
    throw new UnauthorizedException(message)
  }
}
