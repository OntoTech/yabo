import { EmailFieldOptions } from '@common/@types';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { normalizeEmail } from 'helper-fns';

export function IsEmailField(options_?: EmailFieldOptions) {
  const options: EmailFieldOptions = {
    each: false,
    required: true,
    ...options_,
  };

  const decoratorsToApply = [
    ApiProperty(),
    Transform(({ value }: { value: string }) => value.toLowerCase(), {
      toClassOnly: true,
    }),
    Transform(
      ({ value }): string =>
        typeof value === 'string' ? normalizeEmail(value) : value,
      { toClassOnly: true },
    ),
    IsEmail(
      {},
      {
        each: options.each,
      },
    ),
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
