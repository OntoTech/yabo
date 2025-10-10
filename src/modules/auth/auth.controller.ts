import { Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenericController } from '@common/decorators/controller.decorator';
import { HelperUtils } from '@common/helpers';
import { CurrentUser, Public } from '@common/decorators';
import { User } from '@entities';

@GenericController('auth', false)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('me')
  me(@Headers() headers: Record<string, string>, @CurrentUser() user: User) {
    // TODO: extract to env
    const userHeader = headers['user-header'];
    let userInfo = { error: 'No user info' };

    if (userHeader) {
      try {
        userInfo = HelperUtils.parseBase64ToJson(userHeader);
      } catch (e) {
        userInfo = e.message;
      }
    }

    return { headers, userInfo: userInfo, user };
  }
}
