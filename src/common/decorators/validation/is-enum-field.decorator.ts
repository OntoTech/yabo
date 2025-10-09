import { EnumFieldOptins } from '@common/@types';
import { applyDecorators } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export function IsEnumField(
  entity: Record<string, string>,
  options_?: EnumFieldOptins,
) {
  const options: EnumFieldOptins = {
    each: false,
    required: true,
    arrayMinSize: 0,
    arrayMaxSize: Number.MAX_SAFE_INTEGER,
    ...options_,
  };

  const decoratorsToApply = [
    IsEnum(entity, {
      each: options.each,
    }),
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
