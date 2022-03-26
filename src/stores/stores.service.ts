import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStoreDTO } from './dto/create-store-dto';
import { Store } from '../models/stores.model';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<Store>,
  ) {}

  async createStore(store: CreateStoreDTO): Promise<Store> {
    return await this.storeModel.create(store);
  }

  async addToBookings(storeId, bookedTicketId) {
    return await this.storeModel.updateOne(
      { _id: storeId },
      { $push: { bookings: bookedTicketId } },
    );
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.find({}).populate('bookings');
  }

  async findOne(id: string): Promise<Store> {
    return await this.storeModel.findOne({ _id: id }).populate('bookings');
  }

  async updateOne(id: string, store: CreateStoreDTO): Promise<Store> {
    return await this.storeModel.findByIdAndUpdate(id, store, { new: true });
  }

  async deleteOne(id: string): Promise<Store> {
    return await this.storeModel.findOneAndDelete({ _id: id });
  }
}
