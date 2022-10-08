import { UnprocessableEntityException } from "@nestjs/common";

export class Exception {
  static unprocessableEntity(message: string) {
    throw new UnprocessableEntityException(message)
  }
}
