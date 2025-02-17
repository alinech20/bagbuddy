import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserEmailPasswordDto } from './dto/createUser.dto';
import { ProfileService } from '../profile/profile.service';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

/**
 * AuthController handles authentication-related endpoints.
 * It includes methods for user signup using email and password.
 */
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: FirebaseAuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Signs up a new user using email and password.
   * @param userDto - The DTO containing the user's email and password.
   * @returns The created profile of the new user.
   * @throws Error if there is an issue during user creation or profile creation.
   */
  @UsePipes()
  @Post('/signup_email_password')
  async signupEmailPassword(@Body() userDto: CreateUserEmailPasswordDto) {
    try {
      const userCreds = await this.authService.createUser(
        userDto.email,
        userDto.password,
      );

      return await this.profileService.createProfileWithUidAndEmail({
        uid: userCreds.uid,
        email: userCreds.email!,
        status_id: 1,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
