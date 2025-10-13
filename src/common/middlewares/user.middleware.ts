import { UserInfoHeader } from '@common/@types';
import { HelperUtils } from '@common/helpers';
import { UserService } from '@modules/user/user.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<Configs, true>,
  ) {}

  private readonly logger = new Logger(UserMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    const header: string = this.configService.get('app').userHeader;
    const userInfoToken = req.get(header.toLowerCase());

    if (!userInfoToken) {
      this.logger.debug('No user info header on request');
    } else {
      const userInfo: UserInfoHeader =
        HelperUtils.parseBase64ToJson(userInfoToken);

      const user = await this.userService.ensureUserExists(userInfo);

      const adminList = this.configService.get('app').adminList.split(',');
      const managerList = this.configService.get('app').managerList.split(',');

      req['user'] = {
        ...user,
        isAdmin: adminList.includes(user.username),
        isManager: managerList.includes(user.username),
      };
    }

    next();
  }
}
