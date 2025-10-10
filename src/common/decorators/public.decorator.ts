import {
  IS_PUBLIC_KEY_META,
  SWAGGER_API_SECURITY_KEY_META,
} from '@common/constant';
import { applyDecorators, SetMetadata } from '@nestjs/common';

const publicAuthMiddleware = SetMetadata(IS_PUBLIC_KEY_META, true);
const publicAuthSwagger = SetMetadata(SWAGGER_API_SECURITY_KEY_META, [
  IS_PUBLIC_KEY_META,
]);

export const Public = () =>
  applyDecorators(publicAuthSwagger, publicAuthMiddleware);
