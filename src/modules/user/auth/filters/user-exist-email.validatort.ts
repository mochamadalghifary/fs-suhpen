import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../../user/services/user.service";

@ValidatorConstraint({ name: 'IsExistEmail', async: true })
@Injectable()
export class IsExistEmail implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string) {
    return !!await this.userService.findOneByEmail(value)
  }

  defaultMessage(args: ValidationArguments) { return `Email is not exist` }
}
