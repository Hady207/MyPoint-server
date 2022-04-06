import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsSchema } from 'src/models/analytics.model';
import { AnalyticsController } from './analytics.controller';
import { StoreModule } from 'src/stores/stores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Analytic', schema: AnalyticsSchema }]),
    StoreModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
