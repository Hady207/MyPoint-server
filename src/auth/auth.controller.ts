import { Controller, Post, Body, Res, Patch, Param } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async loginUser(@Res() res: Response, @Body() userCredentials: any) {
    const user = await this.authService.validateUser(userCredentials);
    user.password = undefined;
    const accessToken = await this.authService.login(user);
    res.status(200).json({ status: 'success', token: accessToken, user });
  }

  @Post('register')
  async registerUser(@Res() res: Response, @Body() userBody: any) {
    const user = await this.userService.registerUser(userBody);
    // remove the password from response
    user.password = undefined;
    const accessToken = await this.authService.login(user);
    res.status(201).json({ status: 'success', token: accessToken, user });
  }

  @Post('register/admin')
  async registerAdmin(@Res() res: Response, @Body() adminBody: any) {
    const admin = await this.userService.registerAdmin(adminBody);
    // remove the password from response
    admin.password = undefined;
    const accessToken = await this.authService.login(admin);
    res
      .status(201)
      .json({ status: 'success', token: accessToken, user: admin });
  }

  @Patch('fcm/:id')
  async updateFCMToken(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateBody: any,
  ) {
    await this.userService.updateUserToken(id, updateBody);

    res
      .status(201)
      .json({ status: 'success', message: 'fcm token added', fcm: updateBody });
  }
}
