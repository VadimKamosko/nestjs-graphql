import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetJWT } from './DTO/get-jwttoken.args';
import { CreateUserInput } from './input.ts/create-userinput';
import { User } from './models/user';
import { UserService } from './user.service';
import { AxiosResponse } from 'axios';

@Resolver()
export class UserResolver {
  constructor(private readonly userSer: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUser') bodyUser: CreateUserInput) {
    return this.userSer.createUser(bodyUser);
  }
  @Query(() => String, { name: 'JWT', nullable: true })
  getJWT(@Args() bodyLog: GetJWT): Promise<AxiosResponse<String>> {
    return this.userSer.getJWT(bodyLog);
  }
}
