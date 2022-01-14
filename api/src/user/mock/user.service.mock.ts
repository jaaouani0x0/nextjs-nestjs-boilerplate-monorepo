import { Injectable, Logger } from '@nestjs/common';
import { UserDTO } from '../dto/user-dtos';
import {
  internet,
  name,
  random,
  phone
} from 'faker';

@Injectable()
export class UserMockService {

  private logger: Logger = new Logger(UserMockService.name);

  constructor() {}

  findUserProfileByEmail = async (
    email: string,
  ): Promise<UserDTO> => {
    const user = new UserDTO();
    user.firstName = 'First name for testing purpose';
    user.lastName = 'Last name for testing purpose';
    user.email = email;
    user.language = 'fr';

    return user;
  };

  createNewUserProfile = async (
    newUserProfile: UserDTO,
  ): Promise<UserDTO> => {
    return {
      ...newUserProfile,
    };
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
