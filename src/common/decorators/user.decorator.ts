import { User } from '@entities';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    
    const request = context.switchToHttp().getRequest<NestifyRequest>();

    const user = request.user as User;

    return data ? user[data] : user;
  },
);
