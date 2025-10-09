import { StringFieldOptions } from '@common/@types';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MinMaxLength } from './min-max-length.decorator';
import { Sanitize, Trim } from './transform.decorator';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function IsStringField(options_?: StringFieldOptions) {
  const options = {
    required: true,
    each: false,
    sanitize: true,
    trim: true,
    minLength: 2,
    maxLength: Number.MAX_SAFE_INTEGER,
    arrayMinSize: 0,
    arrayMaxSize: Number.MAX_SAFE_INTEGER,
    ...options_,
  } satisfies StringFieldOptions;

  const decoratorsToApply = [
    ApiProperty(),
    IsString({
      each: options.each,
    }),
    MinMaxLength({
      minLength: options.minLength,
      maxLength: options.maxLength,
      each: options.each,
    }),
  ];

  if (options.sanitize) {
    decoratorsToApply.push(Sanitize());
  }

  if (options.regex) {
    decoratorsToApply.push(Matches(options.regex));
  }

  if (options.trim) {
    decoratorsToApply.push(Trim());
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
    decoratorsToApply.push(
      IsArray(),
      // ArrayMaxSize(options.arrayMaxSize),
      // ArrayMinSize(options.arrayMaxSize),
    );
  }

  return applyDecorators(...decoratorsToApply);
}
