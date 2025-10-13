import { Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenericController } from '@common/decorators/controller.decorator';
import { HelperUtils } from '@common/helpers';
import { CurrentUser, Public } from '@common/decorators';
import { User } from '@entities';
import { ConfigService } from '@nestjs/config';

@GenericController('auth', false)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Configs, true>,
  ) {}

  @Public()
  @Get('me')
  me(@Headers() headers: Record<string, string>, @CurrentUser() user: User) {
    const header: string = this.configService.get('app').userHeader;
    const userHeader = headers[header.toLowerCase()];

    let userInfo;

    if (userHeader) {
      try {
        userInfo = HelperUtils.parseBase64ToJson(userHeader);
      } catch (e) {
        userInfo = e.message;
      }
    }

    return {
      headers,
      userInfo: userInfo ?? { error: `No header with name [${header}]` },
      user: user ?? { error: 'No user object' },
    };
  }
}
