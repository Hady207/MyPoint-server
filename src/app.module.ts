import { Module } from '@nestjs/common';
import { StoreModule } from './stores/stores.module';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      autoIndex: true,
    }),
    StoreModule,
    UserModule,
    AuthModule,
    BookingsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
