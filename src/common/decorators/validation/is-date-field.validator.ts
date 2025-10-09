import { DateFieldOptions } from '@common/@types';
import { applyDecorators } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MaxDate,
  MinDate,
} from 'class-validator';

export function IsDateField(options_?: DateFieldOptions) {
  const options: DateFieldOptions = {
    each: false,
    required: true,
    arrayMinSize: 0,
    arrayMaxSize: Number.MAX_SAFE_INTEGER,
    lessThan: false,
    ...options_,
  } satisfies DateFieldOptions;

  const decoratorsToApply = [
    IsDateString(
      { strict: true },
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

  if (options.greaterThan) {
    decoratorsToApply.push(MinDate(options.date!));
  }

  if (options.lessThan) {
    decoratorsToApply.push(MaxDate(options.date!));
  }

  return applyDecorators(...decoratorsToApply);
}
