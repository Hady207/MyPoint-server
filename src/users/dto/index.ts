export class CreateAdminDTO {
  username: string;
  password: string;
  storeAdmin: string;
  role: 'admin';
}

export class CreateUserDTO {
  username: string;
  password: string;
}

export class UserTokenDTO {
  fcmToken: string;
}
