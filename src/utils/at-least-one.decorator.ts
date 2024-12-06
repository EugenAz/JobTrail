import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const fields = args.constraints[0];
    return fields.some((field: string) => value[field] !== undefined);
  }

  defaultMessage(args: ValidationArguments) {
    const fields = args.constraints[0];
    return `At least one of the following fields must be provided: ${fields.join(', ')}`;
  }
}

export function AtLeastOneField(
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Function) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      options: validationOptions,
      constraints: [fields],
      validator: AtLeastOneFieldConstraint,
      validate(value: any) {
        return fields.some((field) => value?.[field] !== undefined);
      },
    });
  };
}
