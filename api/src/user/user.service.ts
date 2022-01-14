import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDTO } from './dto/user-dtos';
import {
  internet,
  name,
  random,
  phone
} from 'faker';

@Injectable()
export class UserService {

  private logger: Logger = new Logger(UserService.name);

  constructor() {}

  findUserProfileByEmail = async (
    email: string,
  ): Promise<UserDTO> => {
    try {
      const user: UserDTO = new UserDTO();
      user.email = email;

      return user;
    } catch (userError) {
      this.logger.error(userError);
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
  };

  createNewUSerProfile = async (
    newUserProfile: any,
  ): Promise<UserDTO> => {

    const user = new UserDTO();
    user.email = newUserProfile.email;
    user.firstName = newUserProfile.firstName;
    user.lastName = newUserProfile.lastName;
    user.language = newUserProfile.language;

    return user;
  };

  fetchUsers = async () : Promise<UserDTO[]>  => {
    return new Array(10)
            .fill(null)
            .map(() => {
                let user = new UserDTO();
                    user.email = internet.email();
                    user.firstName = name.firstName();
                    user.lastName = name.lastName();
                    user.language = random.arrayElement(['fr', 'en', 'jp']);
                    user.phone = phone.phoneNumber()
                return user;
            });
  };
}
