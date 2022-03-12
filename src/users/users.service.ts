import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/users.model';
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

  async getUser(id: string): Promise<User> {
    return await this.userModal.findOne({ _id: id });
  }

  async updateUser(id: string, user: CreateUserDTO): Promise<User> {
    return await this.userModal.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModal.findOneAndDelete({ _id: id });
  }
}
