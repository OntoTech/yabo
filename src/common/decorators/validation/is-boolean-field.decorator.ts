import { BaseValidator } from '@common/@types';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ToBoolean } from './transform.decorator';
import { applyDecorators } from '@nestjs/common';

type IsBooleanValidator = BaseValidator & { each?: boolean };

export function IsBooleanField(options_?: IsBooleanValidator) {
  const options: IsBooleanValidator = {
    each: false,
    required: true,
    ...options_,
  };

  const decoratorsToApply = [
    IsBoolean({
      each: options.each,
    }),
    ToBoolean(),
  ];

  if (options.required) {
    decoratorsToApply.push(
      IsNotEmpty({
        each: options.each,
      }),
    );

    if (options.each) {
      decoratorsToApply.push(ArrayNotEmpty());
    }
  } else {
    decoratorsToApply.push(IsOptional());
  }

  if (options.each) {
    decoratorsToApply.push(IsArray());
  }

  return applyDecorators(...decoratorsToApply);
}
