import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isSecurePassword', async: false })
class IsSecurePasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      value,
    );
    const isLongEnough = value.length >= 8;

    return (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialCharacter &&
      isLongEnough
    );
  }

  defaultMessage(args: ValidationArguments) {
    const failedRequirements = [];

    if (!/[A-Z]/.test(args.value)) {
      failedRequirements.push('uppercase');
    }

    if (!/[a-z]/.test(args.value)) {
      failedRequirements.push('lowercase');
    }

    if (!/\d/.test(args.value)) {
      failedRequirements.push('number');
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(args.value)) {
      failedRequirements.push('special character');
    }

    if (args.value.length < 8) {
      failedRequirements.push('minimum length of 8 characters');
    }

    return `The password must contain: ${failedRequirements.join(', ')}`;
  }
}

export function IsSecurePassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSecurePassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsSecurePasswordConstraint,
    });
  };
}
