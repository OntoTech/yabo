import { NumberFieldOptions } from '@common/@types';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export function IsNumberField(options_?: NumberFieldOptions) {
  const options = {
    min: 1,
    required: true,
    each: false,
    max: Number.MAX_SAFE_INTEGER,
    arrayMinSize: 0,
    arrayMaxSize: Number.MAX_SAFE_INTEGER,
    int: true,
    positive: true,
    ...options_,
  } satisfies NumberFieldOptions;

  const decoratorsToApply = [
    ApiProperty(),
    Type(() => Number),
    Min(options.min, {
      each: options.each,
    }),
    Max(options.max, {
      each: options.each,
    }),
  ];

  if (options.int) {
    decoratorsToApply.push(
      IsInt({
        each: options.each,
      }),
    );
  } else {
    decoratorsToApply.push(
      IsNumber(
        {},
        {
          each: options.each,
        },
      ),
    );
  }

  if (options.positive) {
    decoratorsToApply.push(
      IsPositive({
        each: options.each,
      }),
    );
  }

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
