import { Transform } from 'class-transformer';
import { isArray, isString } from 'helper-fns';
import DOMPurify from 'isomorphic-dompurify';

export function Trim() {
  return Transform((parameters) => {
    const regexp = /\s{2,}/g;
    const value = parameters.value as string[] | string;

    if (isArray(value)) {
      return value.map((v: string) => v.trim().replaceAll(regexp, ' '));
    }

    if (value) {
      return value.trim().replaceAll(regexp, ' ');
    }

    return value;
  });
}

export function ToBoolean() {
  return Transform(
    (parameters) => {
      switch (parameters.value) {
        case 'true': {
          return true;
        }
        case 'false': {
          return false;
        }
        default: {
          return parameters.value as boolean;
        }
      }
    },
    { toClassOnly: true },
  );
}

export function Sanitize(): PropertyDecorator {
  return Transform(
    ({ value }: { value: unknown }) => {
      if (isArray(value)) {
        return value.map((v) => {
          if (isString(v)) {
            return DOMPurify.sanitize(v);
          }

          return v;
        });
      }

      if (isString(value)) {
        return DOMPurify.sanitize(value);
      }

      return value;
    },
    { toClassOnly: true },
  );
}

export function ToArray(): PropertyDecorator {
  return Transform(({ value }: any) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value;
  });
}
