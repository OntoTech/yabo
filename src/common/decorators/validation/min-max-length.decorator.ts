import { MinMaxLengthOptions } from '@common/@types';
import { applyDecorators } from '@nestjs/common';
import { MaxLength, MinLength } from 'class-validator';

export function MinMaxLength(options_?: MinMaxLengthOptions) {
  const options = {
    minLength: 2,
    maxLength: 500,
    each: false,
    ...options_,
  };

  return applyDecorators(
    MinLength(options.minLength, {
      each: options.each,
    }),
    MaxLength(options.maxLength, {
      each: options.each,
    }),
  );
}
