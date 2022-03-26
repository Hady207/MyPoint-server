import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/users.model';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async registerUser(user: CreateUserDTO): Promise<User> {
    return await this.userModel.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getAuthenticatedUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ username }).select('+password');
    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!user || !passwordValidation) {
      throw new UnauthorizedException('credentials incorrect');
    }
    return user;
  }

  async getLoggedInUser(user) {
    const user1 = await this.userModel.findOne({ _id: user.userID });
    return user1;
  }

  async getUser(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async updateUser(id: string, user: CreateUserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
