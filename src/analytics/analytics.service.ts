import { Injectable } from '@nestjs/common';
import { Analytics } from 'src/models/analytics.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('Analytic') private readonly analyticalModel: Model<Analytics>,
    private storeService: StoresService,
  ) {}

  getBookedUserPerMonth(storeId) {}

  async getBookingForTheYear(storeId: string) {
    const store = await this.storeService.findOne(storeId);
  }
}
