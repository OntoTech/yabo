import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { capitalize } from 'helper-fns';

export function GenericController(name: string, secured = true) {
  const decsToApply: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    [ApiTags(capitalize(name)), Controller(name)];

  if (secured) {
    // decsToApply.push(Auth());
  }

  return applyDecorators(...decsToApply);
}
