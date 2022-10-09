import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../../user/services/user.service";

@ValidatorConstraint({ name: 'IsExistPhoneNumber', async: true })
@Injectable()
export class IsExistPhoneNumber implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string) {
    return !!await this.userService.findOneByPhoneNumber(value)
  }

  defaultMessage(args: ValidationArguments) { return `PhoneNumber is not exist` }
}
