import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStoreDTO } from './dto/create-store-dto';
import { Store } from '../models/stores.model';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store') private readonly storeModal: Model<Store>,
  ) {}

  async createStore(store: CreateStoreDTO): Promise<Store> {
    return await this.storeModal.create(store);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModal.find();
  }

  async findOne(id: string): Promise<Store> {
    return await this.storeModal.findOne({ _id: id });
  }

  async updateOne(id: string, store: CreateStoreDTO): Promise<Store> {
    return await this.storeModal.findByIdAndUpdate(id, store, { new: true });
  }

  async deleteOne(id: string): Promise<Store> {
    return await this.storeModal.findOneAndDelete({ _id: id });
  }
}
