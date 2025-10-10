import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@entities';
import { BaseRepository } from '@common/database';
import { BaseService } from '@lib/crud';
import { OffsetPaginationDto } from '@common/dtos';
import { UserInfoHeader } from '@common/@types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService extends BaseService<User, OffsetPaginationDto> {
  protected readonly queryName = 'u';
  protected readonly searchField = 'username';

  constructor(
    @InjectRepository(User) private userRepository: BaseRepository<User>,
  ) {
    super(userRepository);
  }

  async ensureUserExists(userInfoHeader: UserInfoHeader) {
    const user = await this.userRepository.findOne(
      {
        objectGUID: userInfoHeader.objectGUID,
      },
      { populate: ['roles'] },
    );

    if (user) {
      return user;
    }

    return await lastValueFrom(this.createUserFromHeaders(userInfoHeader));
  }

  createUserFromHeaders(userInfoHeader: UserInfoHeader) {
    const {
      email,
      logonname: username,
      firstname: firstName,
      middle_name: middleName,
      family_name: familyName,
      objectGUID,
      uid,
      sub,
    } = userInfoHeader;

    return this.create({
      objectGUID,
      email,
      username,
      firstName,
      middleName,
      familyName,
      uid,
      sub,
    });
  }
}
