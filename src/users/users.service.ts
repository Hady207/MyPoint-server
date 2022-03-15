import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/users.model';
import bcrypt from 'bcryptjs';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModal: Model<User>) {}

  async registerUser(user: CreateUserDTO): Promise<User> {
    return await this.userModal.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModal.find();
  }

  async getAuthenticatedUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userModal.findOne({ username }).select('+password');
    if (!user && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('credentials incorrect');
    }
    return user;
  }

  async getUser(username: string): Promise<User> {
    return await this.userModal.findOne({ username });
  }

  async updateUser(id: string, user: CreateUserDTO): Promise<User> {
    return await this.userModal.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModal.findOneAndDelete({ _id: id });
  }
}
